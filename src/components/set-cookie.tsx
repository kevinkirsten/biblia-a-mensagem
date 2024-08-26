"use client";

import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function SetCookie({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  const [_cookies, setCookie] = useCookies([name]);

  useEffect(() => {
    setCookie(name, value);
  }, []);

  return null;
}
