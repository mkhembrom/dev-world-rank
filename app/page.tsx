import WorldTable from "@/components/worldTable";
import MainLayout from "./layouts/MainLayout";
import { Suspense } from "react";

export default function Home() {
  
  return (
   <MainLayout>
    <div className="mb-10 ">
      <Suspense fallback={<>Loading</>}>
        <WorldTable />
      </Suspense>
    </div>
   </MainLayout>
  )
}
