"use client";

import { useState } from "react";
import { submitStartFlow } from "./actions";

export default function StartPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    birthDate: "",
    birthTime: "",
    city: "",
    country: "",
  });

  const isTimeMissing = !formData.birthTime;

  return (
    <main style={{ maxWidth: "600px", margin: "4rem auto", padding: "2rem", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>DEFRAG Initialization</h1>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ height: "4px", flex: 1, background: s <= step ? "#000" : "#eee" }} />
          ))}
        </div>
      </header>

      {step === 1 && (
        <section>
          <h2>When did you arrive?</h2>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>
            This baseline date anchors the canonical pacing of your field.
          </p>
          <input 
            type="date" 
            value={formData.birthDate}
            onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
            style={{ width: "100%", padding: "1rem", fontSize: "1.2rem", marginBottom: "1rem" }}
          />
          <button 
            onClick={() => setStep(2)}
            disabled={!formData.birthDate}
            style={{ width: "100%", padding: "1rem", background: formData.birthDate ? "#000" : "#ccc", color: "#fff", cursor: "pointer", border: "none" }}
          >
            Continue
          </button>
        </section>
      )}

      {step === 2 && (
        <section>
          <h2>Where and exactly when?</h2>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>
            Time and location determine the exact structural tension in your baseline. If you do not know the exact time, leave it blank.
          </p>
          <input 
            type="time" 
            value={formData.birthTime}
            onChange={e => setFormData({ ...formData, birthTime: e.target.value })}
            placeholder="Birth Time (Optional)"
            style={{ width: "100%", padding: "1rem", fontSize: "1.2rem", marginBottom: "1rem" }}
          />
          <input 
            type="text" 
            value={formData.city}
            onChange={e => setFormData({ ...formData, city: e.target.value })}
            placeholder="City"
            style={{ width: "100%", padding: "1rem", fontSize: "1.2rem", marginBottom: "1rem" }}
          />
          <button 
            onClick={() => setStep(3)}
            style={{ width: "100%", padding: "1rem", background: "#000", color: "#fff", cursor: "pointer", border: "none" }}
          >
            Continue
          </button>
        </section>
      )}

      {step === 3 && (
        <section>
          <h2>Baseline Preview</h2>
          <div style={{ background: "#f9f9f9", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem" }}>
            {isTimeMissing && (
              <div style={{ background: "#fff3e0", padding: "1rem", borderLeft: "4px solid #e65100", marginBottom: "1rem" }}>
                <strong>Estimated Confidence</strong>
                <p style={{ margin: "0.5rem 0 0", fontSize: "0.9rem" }}>
                  Because exact birth time was omitted, some pacing and boundary mechanics will use estimated defensive defaults.
                </p>
              </div>
            )}
            <p><strong>Date:</strong> {formData.birthDate}</p>
            <p><strong>Time:</strong> {formData.birthTime || "Fallback (12:00 PM)"}</p>
            <p><strong>Location:</strong> {formData.city}</p>

            <hr style={{ margin: "1.5rem 0", border: "none", borderTop: "1px solid #ccc" }} />
            
            <p style={{ color: "#444" }}>This initializes your durable workspace session. The platform will now derive the first real-time analysis surface.</p>
          </div>

          <form action={() => submitStartFlow(formData)}>
            <button 
              type="submit"
              style={{ width: "100%", padding: "1rem", background: "#000", color: "#fff", cursor: "pointer", border: "none" }}
            >
              Enter Workspace
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
