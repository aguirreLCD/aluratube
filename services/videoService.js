import { supabase } from "./supabaseClient";

// create a class: function that returns an object, that have methods:
export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video").select("*");
    },
  };
}
