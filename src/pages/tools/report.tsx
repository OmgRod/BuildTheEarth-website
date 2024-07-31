import {
  Alert,
  Button,
  Center,
  Group,
  Paper,
  Space,
  Stepper,
  StepperStep,
  Text,
  TextInput,
  Textarea,
  Title,
  rem,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconInfoCircle,
  IconMessageReport,
  IconSend,
  IconX,
} from "@tabler/icons-react";

import Anchor from "@/components/core/Anchor";
import { CheckboxCard } from "@/components/input/CheckboxCard";
import Layout from "@/components/layout";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const templates = [
  {
    id: "bug",
    title: "Bug",
    subtitle:
      "Report issues or unexpected behavior while dealing with BuildTheEarth services",
    inputs: {
      text: {
        label: "Website URL",
        description: "Input the exact page where the bug happened",
        placeholder: "https://...",
      },
      textarea: {
        label: "Bug Description",
        description: "Describe the issue in as much detail as possible",
        placeholder: "...",
      },
    },
    preview: {
      title: (title: string, description: string) => `Bug on ${title}`,
    },
  },
  {
    id: "user",
    title: "User",
    subtitle: "Report a user for their behaviour or profile data",
    inputs: {
      text: {
        label: "User ID",
        description:
          "Provide the ID of the User, a Discord Account ID is not optimal",
        placeholder: "00000000-0000-0000-0000-000000000000",
      },
      textarea: {
        label: "Description",
        description: "Describe the issue in detail",
        placeholder: "...",
      },
    },
    preview: {
      title: (title: string, description: string) => `User Report of ${title}`,
    },
  },
  {
    id: "wrong_data",
    title: "Wrong Data",
    subtitle:
      "Notify us about incorrect information on any BuildTheEarth website",
    inputs: {
      text: {
        label: "Website URL",
        description:
          "Input the exact page where you found incorrect information",
        placeholder: "https://...",
      },
      textarea: {
        label: "Description",
        description:
          "Describe the location of the incorrect data as detailed as possible",
        placeholder: "...",
      },
    },
    preview: {
      title: (title: string, description: string) =>
        `Incorrect data on ${title}`,
    },
  },
  {
    id: "inappropriate_content",
    title: "Inappropriate Content",
    subtitle: "Report content that might violate our rules",
    inputs: {
      text: {
        label: "Website URL",
        description:
          "Input the exact page where you found inappropriate content",
        placeholder: "https://...",
      },
      textarea: {
        label: "Description",
        description: "Please describe why this content is inappropriate",
        placeholder: "...",
      },
    },
    preview: {
      title: (title: string, description: string) =>
        `Inappropriate Content on ${title}`,
    },
  },
  {
    id: "suggestion",
    title: "Feature Request",
    subtitle: "Suggest new features or improvements",
    inputs: {
      text: {
        label: "Suggestion",
        description: "Give your suggestion a simple title",
        placeholder: "...",
      },
      textarea: {
        label: "Suggestion Description",
        description:
          "Please describe your idea or feature request with as much detail as possible",
        placeholder: "...",
      },
    },
    preview: {
      title: (title: string, description: string) => `Suggestion: ${title}`,
    },
  },
  {
    id: "other",
    title: "Other",
    subtitle: "Report an issue not covered by other categories",
    inputs: {
      text: {
        label: "Subject",
        description: "",
        placeholder: "...",
      },
      textarea: {
        label: "Description",
        description: "Please describe the issue in detail",
        placeholder: "...",
      },
    },
    preview: {
      title: (title: string, description: string) => title,
    },
  },
];

export default function Report() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const nextStep = () =>
    setActiveStep((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActiveStep((current) => (current > 0 ? current - 1 : current));

  const [checked, setChecked] = useState(router.query.template);
  const [template, setTemplate] = useState<any>();
  const [data, setData] = useState({
    template: router.query.template,
    title: router.query.data,
    description: router.query.desc,
  });

  const handleSubmit = async () => {
    const res = await fetch("/api/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: data.description,
        title: template.preview.title(data.title, data.description),
      }),
    });
    if (res.ok) {
      router.reload();
    } else {
      showNotification({
        title: "Error",
        message: "Something went wrong. Please try again later.",
        color: "red",
      });
    }
  };

  return (
    <Layout currentLink="/tools/report" currentSpace="me">
      <Title>BuildTheEarth Report Form</Title>
      <Text mb="xl" c="dimmed">
        To submit a report to us, you need to fill in all the data below.
      </Text>
      <Stepper
        active={activeStep}
        onStepClick={setActiveStep}
        allowNextStepsSelect={false}
      >
        <StepperStep
          label="Report Type"
          description="Select a category"
          icon={
            <IconMessageReport style={{ width: rem(18), height: rem(18) }} />
          }
        >
          <Center w="100%" mt="md">
            <div>
              <Title mb="sm">Report Category</Title>
              {typeof router.query.template == "string" && (
                <Alert maw="50vw" mb="md">
                  You cannot select a different category aside from{" "}
                  <b>
                    {
                      templates.find((t) => t.id == router.query.template)
                        ?.title
                    }
                  </b>
                  , because you were redirected to this form by another
                  application. To select a different category, please submit a{" "}
                  <Anchor href="/tools/report">new report</Anchor>.
                </Alert>
              )}
              <Group maw="50vw" gap="xs">
                {templates.map((template) => (
                  <CheckboxCard
                    key={template.id}
                    title={template.title}
                    subtitle={template.subtitle}
                    disabled={typeof router.query.template == "string"}
                    checked={checked == template.id}
                    onChange={(value) =>
                      value ? setChecked(template.id) : setChecked("")
                    }
                  />
                ))}
              </Group>
              <Group justify="center" mt="xl" grow>
                <Button
                  variant="default"
                  component={Link}
                  href="/tools"
                  rightSection={<IconX size={14} />}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setTemplate(templates.find((t) => t.id == checked));
                    setData({
                      ...data,
                      template: checked,
                    });
                    nextStep();
                  }}
                  rightSection={<IconChevronRight size={14} />}
                >
                  Next step
                </Button>
              </Group>
            </div>
          </Center>
        </StepperStep>
        <StepperStep
          label="Information"
          description="Fill in some details"
          icon={<IconInfoCircle style={{ width: rem(18), height: rem(18) }} />}
        >
          <Center w="100%" mt="md">
            {template && (
              <div style={{ width: "50vw" }}>
                <Title mb="sm">Additional Information</Title>
                <CheckboxCard
                  title={template.title}
                  subtitle={template.subtitle}
                  disabled
                  checked={checked == template.id}
                  onChange={() => {}}
                />
                <Space h="lg" />

                {template.inputs.text && (
                  <TextInput
                    {...template.inputs.text}
                    mb="md"
                    value={data.title}
                    readOnly={typeof router.query.data == "string"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        title: e.target.value,
                      })
                    }
                  />
                )}
                {template.inputs.textarea && (
                  <Textarea
                    {...template.inputs.textarea}
                    rows={10}
                    value={data.description}
                    readOnly={typeof router.query.desc == "string"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        description: e.target.value,
                      })
                    }
                  />
                )}

                <Group justify="center" mt="xl" grow>
                  <Button
                    variant="default"
                    onClick={prevStep}
                    leftSection={<IconChevronLeft size={14} />}
                  >
                    Previous Step
                  </Button>
                  <Button
                    onClick={nextStep}
                    rightSection={<IconChevronRight size={14} />}
                  >
                    Next step
                  </Button>
                </Group>
              </div>
            )}
          </Center>
        </StepperStep>
        <StepperStep
          label="Verify"
          description="Send your report"
          icon={<IconSend style={{ width: rem(18), height: rem(18) }} />}
        >
          <Center w="100%" mt="md">
            {template && (
              <div style={{ width: "50vw" }}>
                <Title mb="sm">Verify Information</Title>

                <Paper
                  w="100%"
                  mih="40vh"
                  bd="rem(1px) solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-8))"
                  radius="sm"
                  p="md"
                  bg="light-dark(var(--mantine-color-white), var(--mantine-color-dark-8))"
                >
                  <div>
                    <Text fw="bold" mb={7} lh={1} fz="xl">
                      {template.preview?.title(data.title, data.description)}
                    </Text>
                    <Text fz="md" mt="xl" ff="text" component="pre">
                      {data.description}
                    </Text>
                  </div>
                </Paper>

                <Space h="lg" />

                <Group justify="center" mt="lg" grow>
                  <Button
                    variant="default"
                    onClick={prevStep}
                    leftSection={<IconChevronLeft size={14} />}
                  >
                    Previous Step
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    rightSection={<IconSend size={14} />}
                  >
                    Send off
                  </Button>
                </Group>
              </div>
            )}
          </Center>
        </StepperStep>
      </Stepper>
    </Layout>
  );
}
