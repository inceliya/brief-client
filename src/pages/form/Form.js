import React, { useRef, useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Box,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { sendForm } from '../../api';

function Form() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const countryRef = useRef(null);
  const shortDescriptionRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [objective, setObjective] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [targetAudience, setTargetAudience] = useState('');
  const [isNewProject, setIsNewProject] = useState(false);
  const [backgroundInfo, setBackgroundInfo] = useState('');
  const [projectName, setProjectName] = useState('');
  const [stakeHolders, setStakeHolders] = useState('');
  const [services, setServices] = useState('');
  const [competition, setCompetition] = useState('');
  const [strengths, setStrengths] = useState('');
  const [weaknesses, setWeaknesses] = useState('');
  const [brandInfo, setBrandInfo] = useState('');

  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendForm({ name, email, phone, country, shortDescription, objective, budget, deadline, targetAudience, isNewProject, backgroundInfo,
      projectName, stakeHolders, services, competition, strengths, weaknesses, brandInfo})
      .then(res => setIsSent(true))
      .catch(() => setIsError(true))
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h3">
        Project brief
      </Typography>
      {isSent &&
        <h2>Your form is submitted. Thank you!</h2>
      }
      {isError &&
        <h2>Error. Please try again</h2>
      }
      {!isError && !isSent &&
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            required
            label="Your name"
            inputRef={nameRef}
            onChange={() => setName(nameRef.current.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            type="email"
            label="Your email"
            inputRef={emailRef}
            onChange={() => setEmail(emailRef.current.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            type="tel"
            label="Your phone"
            inputRef={phoneRef}
            onChange={() => setPhone(phoneRef.current.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="Project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="Project's Country"
            inputRef={countryRef}
            onChange={() => setCountry(countryRef.current.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="What services or products do your company produce?"
            value={services}
            onChange={(e) => setServices(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="How are you different from your competition?"
            value={competition}
            onChange={(e) => setCompetition(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="Describe your company's strengths"
            value={strengths}
            onChange={(e) => setStrengths(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="Describe your company's weaknesses"
            value={weaknesses}
            onChange={(e) => setWeaknesses(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            placeholder="Describe your project idea"
            label="Description"
            inputRef={shortDescriptionRef}
            onChange={() => setShortDescription(shortDescriptionRef.current.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            placeholder="What do you want to get as a result?"
            label="Objective"
            rows={4}
            required
            onChange={(e) => setObjective(e.target.value)}
            value={objective}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="Who are the key stakeholders? Who's the owner/sponsor?"
            value={stakeHolders}
            onChange={(e) => setStakeHolders(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Budget"
            required
            onChange={(e) => setBudget(e.target.value)}
            value={budget}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="Deadline"
            InputLabelProps={{ shrink: true }}
            required
            onChange={(e) => setDeadline(e.target.value)}
            value={deadline}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            label="Target audience"
            rows={2}
            required
            onChange={(e) => setTargetAudience(e.target.value)}
            value={targetAudience}
            margin="normal"
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox onChange={(e) => setIsNewProject(e.target.checked)} checked={isNewProject} />}
              label="Is new project"
            />
          </FormGroup>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            placeholder="colour palette, fonts, slogan"
            label="Brand info"
            value={brandInfo}
            onChange={(e) => setBrandInfo(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            placeholder="Additional information that may be useful"
            label="Backgorund info"
            rows={4}
            onChange={(e) => setBackgroundInfo(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
            Submit
          </Button>
        </Box>
      }
    </Container>
  );
}

export default Form;
