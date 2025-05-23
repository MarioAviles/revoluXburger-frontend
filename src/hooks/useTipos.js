import { useEffect, useState } from "react";
import { getAllTipos } from "../servicios/tiposService";

const useTipos = () => {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTipos = async () => {
    try {
      setLoading(true);
      const data = await getAllTipos();
      setTipos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);
  
    return {
        tipos,
        loading,
        error,
        refetch: fetchTipos,
    };

};

export default useTipos;