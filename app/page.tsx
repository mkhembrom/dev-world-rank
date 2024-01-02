import WorldTable from "@/components/worldTable";
import MainLayout from "./layouts/MainLayout";

export default function Home() {
  
  return (
   <MainLayout>
    <div className="mb-10 ">
        <WorldTable />
    </div>
   </MainLayout>
  )
}
