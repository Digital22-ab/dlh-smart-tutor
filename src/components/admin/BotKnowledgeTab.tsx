import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Bot, Loader2, Save } from "lucide-react";

export function BotKnowledgeTab() {
  const [knowledge, setKnowledge] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadKnowledge();
  }, []);

  const loadKnowledge = async () => {
    const { data } = await supabase
      .from("admin_settings")
      .select("value")
      .eq("key", "bot_knowledge")
      .maybeSingle();
    if (data?.value) {
      setKnowledge(String(data.value));
    }
    setLoading(false);
  };

  const saveKnowledge = async () => {
    setSaving(true);
    // Upsert: try update first, then insert
    const { data: existing } = await supabase
      .from("admin_settings")
      .select("id")
      .eq("key", "bot_knowledge")
      .maybeSingle();

    let error;
    if (existing) {
      ({ error } = await supabase
        .from("admin_settings")
        .update({ value: knowledge as any, updated_at: new Date().toISOString() })
        .eq("key", "bot_knowledge"));
    } else {
      ({ error } = await supabase
        .from("admin_settings")
        .insert({ key: "bot_knowledge", value: knowledge as any }));
    }

    setSaving(false);
    if (error) {
      toast.error("Failed to save: " + error.message);
    } else {
      toast.success("Bot knowledge updated! The AI tutor will use this in future conversations.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="dlh-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Bot className="text-primary-foreground" size={20} />
          </div>
          <div>
            <h3 className="font-semibold">Feed the DLH Smart Tutor</h3>
            <p className="text-sm text-muted-foreground">
              Add custom knowledge, instructions, or context. The AI tutor will use this information when responding to students.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="knowledge">Custom Knowledge & Instructions</Label>
          <Textarea
            id="knowledge"
            value={knowledge}
            onChange={(e) => setKnowledge(e.target.value)}
            placeholder={`Example:\n- DLH classes run every Monday and Wednesday at 7PM GMT on Google Meet\n- Registration fee is 50,000 Leones for DLH 1.0\n- Contact Alikalie on WhatsApp: +232 XX XXX XXXX\n- Next intake starts March 2026\n- Add any announcements, FAQs, or special instructions here...`}
            rows={12}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            This content is appended to the AI tutor's knowledge base. Include schedules, pricing, announcements, FAQs, or any info students might ask about.
          </p>
        </div>

        <Button onClick={saveKnowledge} disabled={saving} className="mt-4 bg-gradient-primary">
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Knowledge
        </Button>
      </div>
    </div>
  );
}
