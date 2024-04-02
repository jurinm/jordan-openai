import ChatGPT from "@/components/ChatGPT/ChatGPT";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ServicesPanel from "@/components/ServicesPanel/ServicesPanel";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div className="flex gap-4">
          <ChatGPT />
          <ServicesPanel />
        </div>
      </DefaultLayout>
    </>
  );
}