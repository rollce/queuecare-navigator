"use client";

import { Alert, Box, Button, Card, CardContent, Checkbox, Container, FormControlLabel, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface Recommendation {
  id: string;
  name: string;
  district: string;
  waitMinutes: number;
}

interface Result {
  urgency: "low" | "medium" | "high";
  score: number;
  message: string;
  recommendations: Recommendation[];
}

export default function TriagePage() {
  const [age, setAge] = useState(24);
  const [painLevel, setPainLevel] = useState(3);
  const [fever, setFever] = useState(false);
  const [breathingIssue, setBreathingIssue] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  async function runTriage() {
    setError("");

    const response = await fetch("/api/triage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ age, painLevel, fever, breathingIssue }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload.error ?? "Unable to run triage");
      setResult(null);
      return;
    }

    setResult(payload);
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>Triage form</Typography>
              <Typography color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                Inputs emulate first-contact decision support.
              </Typography>

              <Stack spacing={2}>
                <TextField type="number" label="Age" value={age} onChange={(e) => setAge(Number(e.target.value))} />
                <TextField
                  select
                  label="Pain level"
                  value={painLevel}
                  onChange={(e) => setPainLevel(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lvl) => (
                    <MenuItem key={lvl} value={lvl}>
                      {lvl}
                    </MenuItem>
                  ))}
                </TextField>
                <FormControlLabel control={<Checkbox checked={fever} onChange={(e) => setFever(e.target.checked)} />} label="Fever present" />
                <FormControlLabel
                  control={<Checkbox checked={breathingIssue} onChange={(e) => setBreathingIssue(e.target.checked)} />}
                  label="Breathing issue"
                />
                <Button variant="contained" onClick={runTriage}>Run triage</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ minHeight: 420 }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>Result</Typography>
              {!result && !error ? (
                <Typography color="text.secondary" sx={{ mt: 2 }}>
                  Submit symptoms to get urgency and best clinics.
                </Typography>
              ) : null}

              {error ? <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert> : null}

              {result ? (
                <Box sx={{ mt: 2 }}>
                  <Alert severity={result.urgency === "high" ? "warning" : result.urgency === "medium" ? "info" : "success"}>
                    {result.message}
                  </Alert>
                  <Typography sx={{ mt: 2 }}>Urgency: <strong>{result.urgency.toUpperCase()}</strong></Typography>
                  <Typography>Score: <strong>{result.score}</strong></Typography>

                  <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Recommended clinics</Typography>
                  <Stack spacing={1}>
                    {result.recommendations.map((clinic) => (
                      <Box key={clinic.id} sx={{ border: "1px solid rgba(19,23,37,0.12)", borderRadius: 2, p: 1.5 }}>
                        <Typography sx={{ fontWeight: 600 }}>{clinic.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {clinic.district} district • Approx wait {clinic.waitMinutes} min
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
