import { BookOpen, ExternalLink, Heart, User } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-12 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 lg:p-8 transition-all duration-300 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Title and About Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="EJS Email Template Viewer Logo"
              className="w-8 h-8 object-contain rounded-lg border border-slate-200/60 dark:border-slate-700/60 shadow-sm bg-white dark:bg-slate-800"
            />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              EJS Template Viewer
            </h3>
          </div>
          <div className="space-y-3.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              A premium developer utility to draft, edit, and test dynamic EJS
              email templates in real time. Mock data parameters via JSON5,
              preview standard responsiveness, and send test emails instantly.
            </p>
            <p>
              This tool helps you streamline your transactional email design
              workflow. By separating components and providing a live,
              side-by-side browser rendering, you can ensure that variable
              substitution, conditional rendering, and includes behave exactly
              as expected before deploying templates to production.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
              <span>Designed for builders and developers.</span>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              How to Use
            </h3>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                1
              </span>
              <span>
                <strong>Draft Templates:</strong> Edit the{" "}
                <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">
                  Header
                </code>
                ,{" "}
                <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">
                  Body
                </code>
                , and{" "}
                <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">
                  Footer
                </code>{" "}
                sections using EJS tags (e.g.{" "}
                <code className="text-xs">&lt;%= name %&gt;</code>).
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                2
              </span>
              <span>
                <strong>Set Context:</strong> Customize template variables using
                JSON or JSON5 mock data in the{" "}
                <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">
                  Data
                </code>{" "}
                editor.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                3
              </span>
              <span>
                <strong>Preview & Test:</strong> Instantly check rendered output
                in the preview tab, copy compiled HTML, or send test emails.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                4
              </span>
              <span>
                <strong>Save Local:</strong> Use the Save button in the header
                menu to save your workspace templates locally.
              </span>
            </li>
          </ul>
          <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider mb-1">
              Pro Tip: Sub-Templates
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
              Use{" "}
              <code className="text-[10px]">
                &lt;%- include('./components/header', &#123; companyName: 'Name'
                &#125;) %&gt;
              </code>{" "}
              inside your Body template to dynamically link and pass variables
              to your Header/Footer partials.
            </p>
          </div>
        </div>

        {/* Ownership and Links Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Ownership & Terms
            </h3>
          </div>
          <div className="space-y-3.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              This application is owned and maintained by{" "}
              <strong>SailorLabs.in</strong>.
            </p>
            <div>
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider mb-1">
                Usage Policy
              </h4>
              <p className="text-xs">
                You can use this site for any purpose as we are not storing any
                of your data. However, copying or redistributing this
                application as a commercial/paid product is strictly prohibited.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider mb-1">
                Developer & Credits
              </h4>
              <p className="text-xs mb-2">
                A big thanks to <strong>Umang Sailor</strong> for building this
                utility.
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                <a
                  href="https://umangsailor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>umangsailor.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://github.com/TuathaDeLugh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider mb-1">
                Contact & Support
              </h4>
              <p className="text-xs">
                For contact/queries, please send a mail to{" "}
                <a
                  href="mailto:service@sailorlabs.in"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  service@sailorlabs.in
                </a>{" "}
                or{" "}
                <a
                  href="mailto:contact@umangsailor.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  contact@umangsailor.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} SailorLabs.in. All rights reserved.
        </div>
        <div className="flex items-center gap-3">
          <span>Version 1.0.0</span>
          <span>&bull;</span>
          <a
            href="https://github.com/sailorlabs-in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
