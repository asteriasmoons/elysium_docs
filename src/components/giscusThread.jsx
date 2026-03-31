"use client";

import React from "react";
import Giscus from "@giscus/react";

export default function GiscusThread() {
  return (
    <Giscus
      repo="asteriasmoons/elysium-docs"
      repoId="R_kgDOPgAyag"
      category="Announcements"
      categoryId="DIC_kwDOPgAyas4Curqq"
      mapping="specific"
      term="announcement-thread"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="en"
    />
  );
}
