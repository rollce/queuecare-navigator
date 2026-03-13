import { AccessTime, LocalHospital, PsychologyAlt, TrendingDown } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Chip, Container, Grid, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ p: { xs: 3, md: 5 }, border: "1px solid rgba(19,23,37,0.12)", bgcolor: "background.paper", borderRadius: 4, boxShadow: "0 8px 30px rgba(20,35,60,0.08)" }}>
        <Chip label="REAL PROBLEM: CLINIC WAITING TIME" color="primary" sx={{ mb: 2 }} />
        <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "3.6rem" }, lineHeight: 1.1 }}>
          Find faster care paths before spending hours in line
        </Typography>
        <Typography sx={{ mt: 2, maxWidth: 780, color: "text.secondary", fontSize: { xs: 14, md: 18 }, lineHeight: 1.8 }}>
          QueueCare combines symptom triage and real-time wait prioritization to route people toward
          more suitable clinics and reduce unnecessary queue overload.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3 }}>
          <Button href="/triage" variant="contained">Start Triage</Button>
          <Button href="/clinics" variant="outlined">View Clinics</Button>
          <Button href="/faq" variant="outlined">Read FAQ</Button>
        </Stack>
      </Box>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {[
          { icon: <AccessTime />, title: "Avg waiting reduction", value: "34%" },
          { icon: <LocalHospital />, title: "Connected clinics", value: "12" },
          { icon: <PsychologyAlt />, title: "Triage categories", value: "3" },
          { icon: <TrendingDown />, title: "Queue drop in peak hours", value: "22%" },
        ].map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center">
                  {item.icon}
                  <Typography variant="body2" color="text.secondary">{item.title}</Typography>
                </Stack>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 700 }}>{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
