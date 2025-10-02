import { useState, useEffect, useCallback } from "react";
import { Mail } from "lucide-react";
import ejs from "ejs";
import { debounce } from "./utils/debounce";
import HeaderTemplate from "./components/HeaderTemplate";
import BodyTemplate from "./components/BodyTemplate";
import FooterTemplate from "./components/FooterTemplate";
import TemplateData from "./components/TemplateData";
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
    fetch("/components/header.ejs")
      .then((res) => res.text())
      .then((text) => setHeaderTemplate(text))
      .catch(() => {});

    fetch("/components/footer.ejs")
      .then((res) => res.text())
      .then((text) => setFooterTemplate(text))
      .catch(() => {});
  }, []);

  const handleRender = useCallback(() => {
    try {
      const parsedData = JSON.parse(data);

      let processedTemplate = bodyTemplate;

      const headerIncludeRegex =
        /<%[-=]\s*include\(['"]\.\/components\/header['"],?\s*(\{[^}]*\})?\s*\)\s*%>/g;
      processedTemplate = processedTemplate.replace(
        headerIncludeRegex,
        (match, params) => {
          if (params) {
            return headerTemplate;
          }
          return headerTemplate;
        }
      );

      const footerIncludeRegex =
        /<%[-=]\s*include\(['"]\.\/components\/footer['"],?\s*(\{[^}]*\})?\s*\)\s*%>/g;
      processedTemplate = processedTemplate.replace(footerIncludeRegex, () => {
        return footerTemplate;
      });

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
      const parsed = JSON.parse(data);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 pb-8">
        <div className="sticky top-0 z-10 bg-gradient-to-br from-slate-50 to-slate-100 text-center py-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Mail className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-800">
              EJS Email Template Viewer
            </h1>
          </div>
          <p className="text-slate-600">
            Create and preview email templates with live rendering
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <HeaderTemplate
              value={headerTemplate}
              onChange={setHeaderTemplate}
            />
            <BodyTemplate
              value={bodyTemplate}
              onChange={setBodyTemplate}
              onAddHeader={handleAddHeader}
              onAddFooter={handleAddFooter}
            />
            <FooterTemplate
              value={footerTemplate}
              onChange={setFooterTemplate}
            />
            <TemplateData value={data} onChange={setData} />
          </div>

          <Preview
            rendered={rendered}
            error={error}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
