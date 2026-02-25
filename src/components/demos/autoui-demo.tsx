"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const exampleSchema = `{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "age": { "type": "integer", "minimum": 18 },
    "role": { "type": "string", "enum": ["admin", "user", "guest"] }
  },
  "required": ["name", "email"]
}`;

export function AutoUIDemo() {
  const [schema, setSchema] = useState(exampleSchema);
  const [parsedSchema, setParsedSchema] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsed = JSON.parse(schema);
      setParsedSchema(parsed);
      setError(null);
    } catch {
      setError("Invalid JSON schema");
      setParsedSchema(null);
    }
  }, [schema]);

  const renderField = (key: string, prop: Record<string, unknown>) => {
    const types: Record<string, string> = {
      string: "text",
      integer: "number",
      number: "number",
      boolean: "checkbox",
    };

    if (Array.isArray(prop.enum)) {
      return (
        <Select key={key}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select ${key}`} />
          </SelectTrigger>
          <SelectContent>
            {(prop.enum as string[]).map((e: string) => (
              <SelectItem key={e} value={e}>
                {e}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        key={key}
        type={types[prop.type as string] || "text"}
        placeholder={key}
        className="bg-background/50"
      />
    );
  };

  return (
    <Card className="p-4 bg-card/80 backdrop-blur">
      <h4 className="font-semibold text-sm mb-4">AutoUI Generator Demo</h4>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">
            JSON Schema Input
          </Label>
          <Textarea
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
            className="font-mono text-xs h-48 bg-background/50 resize-none"
            spellCheck={false}
          />
          {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>

        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">
            Generated Form Preview
          </Label>
          <div className="space-y-2 p-3 bg-background/30 rounded-lg h-48 overflow-y-auto">
            {parsedSchema?.properties ? (
              Object.entries(parsedSchema.properties as Record<string, Record<string, unknown>>).map(
                ([key, prop]) => (
                  <div key={key}>
                    <Label className="text-xs">
                      {key}
                      {(parsedSchema.required as string[])?.includes(key) && (
                        <span className="text-red-400 ml-1">*</span>
                      )}
                    </Label>
                    {renderField(key, prop)}
                  </div>
                )
              )
            ) : (
              <p className="text-xs text-muted-foreground italic">
                {error ? "Fix schema errors" : "Enter a valid JSON schema"}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
