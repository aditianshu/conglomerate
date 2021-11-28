import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Grid, Button, Container, Stack, Typography, Box, TextField, Avatar } from '@mui/material';

// components
import Page from '../components/Page';


// ----------------------------------------------------------------------

export default function Guidelines() {
  return (
    <Page title="Guidelines | Conglomerate">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom>
                Guidelines for posting
          </Typography>
        </Stack>
        <hr/>
        
        <Stack direction="column" alignItems="left" justifyContent="space-between" mb={5} mt={5}>
          <Typography variant="h5" gutterBottom>
            1. No Spam / Advertising / Self-promote in the forums
          </Typography>
            <Typography>
            These forums define spam as unsolicited advertisement for goods, services and/or other web sites, or posts with little, or completely unrelated content. Do not spam the forums with links to your site or product, or try to self-promote your website, business or forums etc. Spamming also includes sending private messages to a large number of different users.
            </Typography>
        </Stack>

        <Stack direction="column" alignItems="left" justifyContent="space-between" mb={5}>
            <Typography variant="h5" gutterBottom>
                2. Do not post copyright-infringing material
            </Typography>
            <Typography>
                Providing or asking for information on how to illegally obtain copyrighted materials is forbidden
            </Typography>
        </Stack>

        <Stack direction="column" alignItems="left" justifyContent="space-between" mb={5}>
            <Typography variant="h5" gutterBottom>
                3. Do not post “offensive” posts, links or images
            </Typography>
            <Typography>
                Any material which constitutes defamation, harassment, or abuse is strictly prohibited. Material that is sexually or otherwise obscene, racist, or otherwise overly discriminatory is not permitted on these forums. This includes user pictures. Use common sense while posting. This is a web site for accountancy professionals.
            </Typography>
        </Stack>

        <Stack direction="column" alignItems="left" justifyContent="space-between" mb={5}>
            <Typography variant="h5" gutterBottom>
                4. Do not cross post questions
            </Typography>
            <Typography>
                Please refrain from posting the same question in several forums. There is normally one forum which is most suitable in which to post your question.
            </Typography>
        </Stack>

        <Stack direction="column" alignItems="left" justifyContent="space-between" mb={5}>
            <Typography variant="h5" gutterBottom>
                5. Do not PM users asking for help
            </Typography>
            <Typography>
                Do not send private messages to any users asking for help. If you need help, make a new thread in the appropriate forum then the whole community can help and benefit.
            </Typography>
        </Stack>

        <Stack direction="column" alignItems="left" justifyContent="space-between" mb={5}>
            <Typography variant="h5" gutterBottom>
                6. Remain respectful of other members at all times
            </Typography>
            <Typography>
                All posts should be professional and courteous. You have every right to disagree with your fellow community members and explain your perspective. However, you are not free to attack, degrade, insult, or otherwise belittle them or the quality of this community. It does not matter what title or power you hold in these forums, you are expected to obey this rule.
            </Typography>
        </Stack>

      </Container>
    </Page>
  );
}
