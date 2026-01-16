"use client"
import { ComponentProps, useState, useEffect } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import "../builder-registry";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

type BuilderPageProps = ComponentProps<typeof BuilderComponent>;

export function RenderBuilderContent(props: BuilderPageProps) {
  const isPreviewing = useIsPreviewing();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If content exists, always render the BuilderComponent
  if (props.content) {
    return <BuilderComponent {...props} />;
  }

  // Only check isPreviewing after client-side mount to avoid hydration mismatch
  if (isMounted && isPreviewing) {
    return <BuilderComponent {...props} />;
  }

  // During SSR or when not previewing and no content, show 404
  if (isMounted && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  // Return null during initial client render to match server
  return null;
}
