import { useState, useEffect, useRef } from "react";

export const useFetch = (url) => {
  const isMounted = useRef(true);
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  // hay una mejor forma de hacer esto esto es a la antigua un workaround, no es bueno para la memoria.
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  //  esta es la forma correcta
  // ======== codigo ejemplo==============

  // useEffect(() => {
  //   const abortController = new AbortController()   // creating an AbortController
  //   fetch(url, { signal: abortController.signal })  // passing the signal to the query
  //     .then(data => {
  //       setState(data)                              // if everything went well, set the state
  //     })
  //     .catch(error => {
  //       if (error.name === 'AbortError') return     // if the query has been aborted, do nothing
  //       throw error
  //     })

  //   return () => {
  //     abortController.abort()                       // stop the query by aborting on the AbortController on unmount
  //   }
  // }, [])

  // ======== codigo ejemplo==============

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4d6ecc08fbmsh4b36dbb74d831efp15fe8ajsn9f92fe369271",
      "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
    },
  };
  useEffect(() => {
    setState({
      data: null,
      loading: true,
      error: null,
    });

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (isMounted.current) {
          setState({
            loading: false,
            error: null,
            data: [data],
          });
        }
      })
      .catch(() => {
        setState({
          loading: false,
          error: "No se pudo cargar la info",
          data: null,
        });
      });
  }, [url]);

  return state;
};
