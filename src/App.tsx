import { useState, useEffect } from 'react';
import { Eye, Code, Mail } from 'lucide-react';
import ejs from 'ejs';

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
  const [headerTemplate, setHeaderTemplate] = useState('');
  const [bodyTemplate, setBodyTemplate] = useState(defaultBody);
  const [footerTemplate, setFooterTemplate] = useState('');
  const [data, setData] = useState(defaultData);
  const [rendered, setRendered] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');

  useEffect(() => {
    fetch('/components/header.ejs')
      .then(res => res.text())
      .then(text => setHeaderTemplate(text))
      .catch(() => {});

    fetch('/components/footer.ejs')
      .then(res => res.text())
      .then(text => setFooterTemplate(text))
      .catch(() => {});
  }, []);

  const handleRender = () => {
    try {
      const parsedData = JSON.parse(data);

      let processedTemplate = bodyTemplate;

      const headerIncludeRegex = /<%[-=]\s*include\(['"]\.\/components\/header['"],?\s*(\{[^}]*\})?\s*\)\s*%>/g;
      processedTemplate = processedTemplate.replace(headerIncludeRegex, (match, params) => {
        if (params) {
          return headerTemplate;
        }
        return headerTemplate;
      });

      const footerIncludeRegex = /<%[-=]\s*include\(['"]\.\/components\/footer['"],?\s*(\{[^}]*\})?\s*\)\s*%>/g;
      processedTemplate = processedTemplate.replace(footerIncludeRegex, () => {
        return footerTemplate;
      });

      const result = ejs.render(processedTemplate, parsedData);
      setRendered(result);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setRendered('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Mail className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-800">EJS Email Template Viewer</h1>
          </div>
          <p className="text-slate-600">Create and preview email templates with live rendering</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-slate-300" />
                <h2 className="text-white font-semibold">Header Template</h2>
              </div>
              <textarea
                value={headerTemplate}
                onChange={(e) => setHeaderTemplate(e.target.value)}
                className="w-full h-48 p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Enter header template..."
              />
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-slate-300" />
                <h2 className="text-white font-semibold">Body Template</h2>
              </div>
              <textarea
                value={bodyTemplate}
                onChange={(e) => setBodyTemplate(e.target.value)}
                className="w-full h-64 p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Enter body template with includes..."
              />
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-slate-300" />
                <h2 className="text-white font-semibold">Footer Template</h2>
              </div>
              <textarea
                value={footerTemplate}
                onChange={(e) => setFooterTemplate(e.target.value)}
                className="w-full h-48 p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Enter footer template..."
              />
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-slate-300" />
                <h2 className="text-white font-semibold">Template Data (JSON)</h2>
              </div>
              <textarea
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full h-48 p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Enter JSON data..."
              />
            </div>

            <button
              onClick={handleRender}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Render Template
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-slate-800 px-4 py-3 flex items-center justify-between">
                <h2 className="text-white font-semibold">Preview</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      activeTab === 'preview'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setActiveTab('html')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      activeTab === 'html'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    HTML
                  </button>
                </div>
              </div>
              <div className="h-[600px] overflow-auto">
                {error ? (
                  <div className="p-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="text-red-800 font-semibold mb-2">Error</h3>
                      <p className="text-red-600 text-sm font-mono">{error}</p>
                    </div>
                  </div>
                ) : rendered ? (
                  activeTab === 'preview' ? (
                    <iframe
                      srcDoc={rendered}
                      className="w-full h-full border-0"
                      title="Email Preview"
                      sandbox="allow-same-origin"
                    />
                  ) : (
                    <pre className="p-4 text-sm overflow-auto h-full">
                      <code className="text-slate-700">{rendered}</code>
                    </pre>
                  )
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400">
                    <div className="text-center">
                      <Mail className="w-16 h-16 mx-auto mb-3 opacity-50" />
                      <p>Click "Render Template" to see the preview</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
