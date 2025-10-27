import HeaderTemplate from "./HeaderTemplate";
import BodyTemplate from "./BodyTemplate";
import FooterTemplate from "./FooterTemplate";
import TemplateData from "./TemplateData";
import { EmailSender } from "./EmailSender";

interface TemplateEditorProps {
  headerTemplate: string;
  setHeaderTemplate: (value: string) => void;
  bodyTemplate: string;
  setBodyTemplate: (value: string) => void;
  footerTemplate: string;
  setFooterTemplate: (value: string) => void;
  data: string;
  setData: (value: string) => void;
  rendered: string;
}

export function TemplateEditor({
  headerTemplate,
  setHeaderTemplate,
  bodyTemplate,
  setBodyTemplate,
  footerTemplate,
  setFooterTemplate,
  data,
  setData,
  rendered,
}: TemplateEditorProps) {
  return (
    <div className="space-y-4">
      <HeaderTemplate value={headerTemplate} onChange={setHeaderTemplate} />
      <BodyTemplate value={bodyTemplate} onChange={setBodyTemplate} />
      <FooterTemplate value={footerTemplate} onChange={setFooterTemplate} />
      <TemplateData value={data} onChange={setData} />
      <EmailSender rendered={rendered} />
    </div>
  );
}
