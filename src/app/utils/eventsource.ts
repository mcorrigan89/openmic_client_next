"use client";

import { useState, useEffect, useRef } from "react";

interface EventSourceOptions<T> {
  onMessage?: (data: T | null, e: Event) => void;
  onOpen?: (event: Event) => void;
  onError?: (event: Event) => void;
  initialState?: T;
}

export function useEventSource<T>(
  url: string,
  options: EventSourceOptions<T> = {}
) {
  const { initialState = null, onMessage, onOpen, onError } = options;
  const [data, setData] = useState<T | null>(initialState);
  const [status, setStatus] = useState("idle");
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Only create the EventSource once
    if (!eventSourceRef.current && typeof window !== "undefined") {
      setStatus("connecting");

      //   if (!eventSourceRef.current) {
      // Create new EventSource connection
      const eventSource = new EventSource(url);
      // eventSourceRef.current = eventSource;
      //   }

      // Handle connection open
      eventSource.onopen = (event) => {
        setStatus("open");
        if (onOpen) onOpen(event);
      };

      // Handle incoming messages
      eventSource.onmessage = (event) => {
        console.log(event);
        try {
          const parsedData = JSON.parse(event.data);
          setData(parsedData);
          if (onMessage) onMessage(parsedData, event);
        } catch (error) {
          console.error("Failed to parse SSE data:", error);
          setData(event.data);
          if (onMessage) onMessage(event.data, event);
        }
      };

      // Handle errors
      eventSource.onerror = (error) => {
        setStatus("error");
        if (onError) onError(error);
      };
    }

    // Cleanup: close the connection when the component unmounts
    return () => {
      console.log("CLEANUP");
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [url]); // Dependencies ensure we only connect once

  // Function to manually close the connection
  const close = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setStatus("closed");
    }
  };

  return { data, status, close };
}
