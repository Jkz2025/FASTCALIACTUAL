import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardGeneral from "../DashboardGeneral/DashboardGeneral";
import DasboardReal from "../DashboardReal/DasboardReal";
import { supabase } from "../../../CreateClient";
import Loading from "../../Loading/Loading";

const Home = () => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate()
  const [loading, setIsLoading ] = useState(true)


  useEffect(() => {
    console.log("Session:", session)
    if (session === null){
      setIsLoading(false)
    }
  }, [session])

  useEffect(() => {
    const fetchSession = async () => {

      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Se presento el siguiente error obteniendo los datos se sesion:', error)
      } else {
        setSession(data.session)
      }
    }
    fetchSession()
  }, [])

if(loading) {
  return <Loading/>
}

  return (
    <div className="min-h-sreen">
      {session ? 

        <DasboardReal/>
        :
        <DashboardGeneral/>
}
</div>
  )
}

export default Home
