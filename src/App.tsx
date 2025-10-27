import { useState, useEffect, useCallback } from "react";
import ejs from "ejs";
import JSON5 from "json5";
import toast, { Toaster } from "react-hot-toast";
import { debounce } from "./utils/debounce";
import { Header } from "./components/Header";
import { TemplateEditor } from "./components/TemplateEditor";
import Preview from "./components/Preview";

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
  "name": "John Doe",
  "email": "john@example.com",
  "actionUrl": "https://example.com/dashboard",
  "companyName": "My Company",
  "title": "Welcome Email",
  "unsubscribeUrl": "https://example.com/unsubscribe",
  "privacyUrl": "https://example.com/privacy"
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

  const handleRender = useCallback(async () => {
    try {
      const parsedData = JSON5.parse(data);

      let processedTemplate = bodyTemplate;

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
        (match, paramsString) => {
          const includeData = {
            ...parsedData,
            ...evaluateParams(paramsString, parsedData),
          };
          return ejs.render(headerTemplate, includeData);
        }
      );

      const footerIncludeRegex =
        /<%[-=]\s*include\(['"]\.\/components\/footer['"],?\s*(\{[^}]*\})?\s*\)\s*%>/g;

      processedTemplate = processedTemplate.replace(
        footerIncludeRegex,
        (match, paramsString) => {
          const includeData = {
            ...parsedData,
            ...evaluateParams(paramsString, parsedData),
          };
          return ejs.render(footerTemplate, includeData);
        }
      );

      const result = ejs.render(processedTemplate, parsedData);
      setRendered(result);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setRendered("");
    }
  }, [headerTemplate, bodyTemplate, footerTemplate, data]);

  const debouncedRender = useCallback(debounce(handleRender, 500), [
    handleRender,
  ]);

  useEffect(() => {
    debouncedRender();
  }, [headerTemplate, bodyTemplate, footerTemplate, data, debouncedRender]);

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
        <div className="container mx-auto px-4 pb-8">
          <Header
            onSaveTemplates={handleSaveTemplates}
            onAddHeader={handleAddHeader}
            onAddFooter={handleAddFooter}
            onClearAll={handleClearAllData}
          />

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
        </div>
      </div>
    </>
  );
}

export default App;
