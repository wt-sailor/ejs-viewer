import { useState, useEffect, useCallback, useRef } from "react";
import ejs from "ejs";
import JSON5 from "json5";
import toast, { Toaster } from "react-hot-toast";
import { debounce } from "./utils/debounce";
import { Header } from "./components/Header";
import { TemplateEditor } from "./components/TemplateEditor";
import Preview from "./components/Preview";
import beautify from "js-beautify";
import { SiteFooter } from "./components/SiteFooter";

const defaultBody = `<%- include('./components/header', {
  title: 'Welcome Email',
  companyName: companyName
}) %>

<h2>Hello, <%= name %>!</h2>
<p>Welcome to our service. We're excited to have you on board.</p>
<p>Your account has been created with the email: <strong><%= email %></strong></p>
<a href="<%= actionUrl %>" style="display: inline-block; padding: 12px 24px; background: #0066cc; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">Get Started</a>
<p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>

<%- include('./components/footer') %>`;

const defaultData = `{
  "name": "Lugh Tuatha Dé",
  "email": "umang@blogforge.in",
  "actionUrl": "https://vibemessage.sailorlabs.in/dashboard",
  "companyName": "Sailor Labs.in",
  "title": "Welcome Email",
  "unsubscribeUrl": "https://vibemessage.sailorlabs.in",
  "privacyUrl": "https://vibemessage.sailorlabs.in/dashboard"
}`;

function App() {
  const [headerTemplate, setHeaderTemplate] = useState("");
  const [bodyTemplate, setBodyTemplate] = useState(defaultBody);
  const [footerTemplate, setFooterTemplate] = useState("");
  const [data, setData] = useState(defaultData);
  const [rendered, setRendered] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"preview" | "html">("preview");

  useEffect(() => {
    const savedHeader = localStorage.getItem("ejs-viewer-header");
    if (savedHeader) {
      setHeaderTemplate(savedHeader);
    } else {
      fetch("/components/header.ejs")
        .then((res) => res.text())
        .then((text) => setHeaderTemplate(text))
        .catch(() => {});
    }

    const savedFooter = localStorage.getItem("ejs-viewer-footer");
    if (savedFooter) {
      setFooterTemplate(savedFooter);
    } else {
      fetch("/components/footer.ejs")
        .then((res) => res.text())
        .then((text) => setFooterTemplate(text))
        .catch(() => {});
    }

    const savedBody = localStorage.getItem("ejs-viewer-body");
    if (savedBody) {
      setBodyTemplate(savedBody);
    }

    const savedData = localStorage.getItem("ejs-viewer-data");
    if (savedData) {
      setData(savedData);
    }
  }, []);

  const headerTemplateRef = useRef(headerTemplate);
  const bodyTemplateRef = useRef(bodyTemplate);
  const footerTemplateRef = useRef(footerTemplate);
  const dataRef = useRef(data);

  useEffect(() => {
    headerTemplateRef.current = headerTemplate;
    bodyTemplateRef.current = bodyTemplate;
    footerTemplateRef.current = footerTemplate;
    dataRef.current = data;
  }, [headerTemplate, bodyTemplate, footerTemplate, data]);

  const handleRender = useCallback(async () => {
    try {
      const currentHeader = headerTemplateRef.current;
      const currentBody = bodyTemplateRef.current;
      const currentFooter = footerTemplateRef.current;
      const currentData = dataRef.current;

      const parsedData = JSON5.parse(currentData);
      let processedTemplate = currentBody;

      const evaluateParams = (
        paramsString: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        context: Record<string, any>
      ) => {
        if (!paramsString) return {};
        try {
          const cleanParams = paramsString
            .replace(/,\s*}/g, "}")
            .replace(/,\s*\]/g, "]");
          const func = new Function(
            ...Object.keys(context),
            `"use strict";return (${cleanParams});`
          );
          return func(...Object.values(context));
        } catch (err) {
          console.warn("Failed to evaluate include params:", err);
          return {};
        }
      };
      const headerIncludeRegex =
        /<%[-=]\s*include\(['"]\.\/components\/header['"],?\s*(\{[^}]*\})?\s*\)\s*%>/g;

      processedTemplate = processedTemplate.replace(
        headerIncludeRegex,
        (_match, paramsString) => {
          const includeData = {
            ...parsedData,
            ...evaluateParams(paramsString, parsedData),
          };
          return ejs.render(currentHeader, includeData);
        }
      );

      const footerIncludeRegex =
        /<%[-=]\s*include\(['"]\.\/components\/footer['"],?\s*(\{[^}]*\})?\s*\)\s*%>/g;

      processedTemplate = processedTemplate.replace(
        footerIncludeRegex,
        (_match, paramsString) => {
          const includeData = {
            ...parsedData,
            ...evaluateParams(paramsString, parsedData),
          };
          return ejs.render(currentFooter, includeData);
        }
      );

      const result = ejs.render(processedTemplate, parsedData);
      setRendered(result);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setRendered("");
    }
  }, []);

  const debouncedRender = useCallback(debounce(handleRender, 500), [
    handleRender,
  ]);

  useEffect(() => {
    debouncedRender();
  }, [headerTemplate, bodyTemplate, footerTemplate, data, debouncedRender]);

  const handleFormat = useCallback(() => {
    const currentHeader = headerTemplateRef.current;
    const currentBody = bodyTemplateRef.current;
    const currentFooter = footerTemplateRef.current;

    const activeTextarea = document.activeElement as HTMLTextAreaElement | null;
    let selectionStart = 0;
    let selectionEnd = 0;
    if (activeTextarea) {
      selectionStart = activeTextarea.selectionStart;
      selectionEnd = activeTextarea.selectionEnd;
    }

    const beautifyOptions = {
      indent_size: 2,
      indent_char: " ",
      max_preserve_newlines: 2,
      preserve_newlines: true,
      wrap_line_length: 0,
      indent_inner_html: false,
    };

    let changed = false;

    if (currentHeader) {
      const formatted = beautify.html(currentHeader, beautifyOptions);
      if (formatted !== currentHeader) {
        setHeaderTemplate(formatted);
        changed = true;
      }
    }

    if (currentBody) {
      const formatted = beautify.html(currentBody, beautifyOptions);
      if (formatted !== currentBody) {
        setBodyTemplate(formatted);
        changed = true;
      }
    }

    if (currentFooter) {
      const formatted = beautify.html(currentFooter, beautifyOptions);
      if (formatted !== currentFooter) {
        setFooterTemplate(formatted);
        changed = true;
      }
    }

    if (changed && activeTextarea) {
      requestAnimationFrame(() => {
        try {
          activeTextarea.focus();
          activeTextarea.setSelectionRange(selectionStart, selectionEnd);
        } catch (e) {
          console.warn("Could not restore selection range:", e);
        }
      });
    }
  }, []);

  const debouncedFormat = useCallback(debounce(handleFormat, 5000), [
    handleFormat,
  ]);

  useEffect(() => {
    debouncedFormat();
  }, [headerTemplate, bodyTemplate, footerTemplate, debouncedFormat]);

  const handleAddHeader = useCallback(() => {
    try {
      const parsed = JSON5.parse(data);
      const companyName = parsed.companyName || "My Company";
      setBodyTemplate(
        `<%- include('./components/header', { title: 'Welcome Email', companyName: '${companyName}' }) %>\n` +
          bodyTemplate
      );
    } catch {
      setBodyTemplate(
        `<%- include('./components/header', { title: 'Welcome Email', companyName: 'My Company' }) %>\n` +
          bodyTemplate
      );
    }
  }, [data, bodyTemplate]);

  const handleAddFooter = useCallback(() => {
    setBodyTemplate(bodyTemplate + `\n<%- include('./components/footer') %>`);
  }, [bodyTemplate]);

  const handleSaveTemplates = useCallback(() => {
    localStorage.setItem("ejs-viewer-header", headerTemplate);
    localStorage.setItem("ejs-viewer-footer", footerTemplate);
    toast.success("Header, Footer and Recipient Email Saved.");
  }, [headerTemplate, footerTemplate]);

  const handleClearAllData = () => {
    localStorage.removeItem("ejs-viewer-header");
    localStorage.removeItem("ejs-viewer-footer");
    localStorage.removeItem("ejs-viewer-body");
    localStorage.removeItem("ejs-viewer-data");
    localStorage.removeItem("ejs-viewer-recipient-email");
    localStorage.removeItem("theme");
    localStorage.removeItem("codeTheme");
    toast.success("All saved data cleared!");
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Header
          onSaveTemplates={handleSaveTemplates}
          onAddHeader={handleAddHeader}
          onAddFooter={handleAddFooter}
          onClearAll={handleClearAllData}
        />
        <div className="container mx-auto px-4 pt-1 pb-8">
          <div className="grid lg:grid-cols-2 gap-6">
            <TemplateEditor
              headerTemplate={headerTemplate}
              setHeaderTemplate={setHeaderTemplate}
              bodyTemplate={bodyTemplate}
              setBodyTemplate={setBodyTemplate}
              footerTemplate={footerTemplate}
              setFooterTemplate={setFooterTemplate}
              data={data}
              setData={setData}
              rendered={rendered}
            />

            <Preview
              rendered={rendered}
              error={error}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          <SiteFooter />
        </div>
      </div>
    </>
  );
}

export default App;
