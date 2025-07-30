import { useState } from "react";
import { valores, equipo, estadisticas } from "../../Dashboard/Navbar/constantes";


const WhoWeAre = () => {
  const [activeTab, setActiveTab] = useState('historia');


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative  bg-gray-900 text-white py-20 px-4">
<div className="max-w-6xl mx-auto text-center">
<h1 className="text-5xl font-bold mb-6">
Fast Cali
</h1>
</div>
      </div>

    </div>


  )
}

export default WhoWeAre