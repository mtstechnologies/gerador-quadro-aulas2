'use server';

/**
 * @fileOverview A flow for generating school schedules automatically.
 *
 * - generateSchedule - A function that handles the schedule generation process.
 * - GenerateScheduleInput - The input type for the generateSchedule function.
 * - GenerateScheduleOutput - The return type for the generateSchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateScheduleInputSchema = z.object({
  numClasses: z
    .number()
    .describe('The number of classes to generate a schedule for.')
    .default(50),
  restrictions: z
    .string()
    .describe('A description of the restrictions to consider when generating the schedule.')
    .default('Consider all available teachers, classrooms, and subjects.'),
});
export type GenerateScheduleInput = z.infer<typeof GenerateScheduleInputSchema>;

const ScheduleOptionSchema = z.object({
  schedule: z.string().describe('A possible generated schedule.'),
  qualityMetrics: z.string().describe('Metrics describing the quality of the schedule.'),
});

const GenerateScheduleOutputSchema = z.object({
  scheduleOptions: z.array(ScheduleOptionSchema).describe('An array of possible schedule options.'),
  generationTime: z
    .string()
    .describe('The time it took to generate the schedule options.'),
});
export type GenerateScheduleOutput = z.infer<typeof GenerateScheduleOutputSchema>;

export async function generateSchedule(input: GenerateScheduleInput): Promise<GenerateScheduleOutput> {
  return generateScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSchedulePrompt',
  input: {schema: GenerateScheduleInputSchema},
  output: {schema: GenerateScheduleOutputSchema},
  prompt: `You are a schedule optimization expert. Generate multiple school schedule options, considering the following:

Number of Classes: {{{numClasses}}}
Restrictions: {{{restrictions}}}

Each schedule option should include a schedule and quality metrics. Ensure the generation completes within 3 minutes.

Output multiple possible schedules. For each, provide quality metrics like number of conflicts, teacher idle time, etc.`,
});

const generateScheduleFlow = ai.defineFlow(
  {
    name: 'generateScheduleFlow',
    inputSchema: GenerateScheduleInputSchema,
    outputSchema: GenerateScheduleOutputSchema,
  },
  async input => {
    const startTime = Date.now();
    const {output} = await prompt(input);
    const endTime = Date.now();
    const generationTime = `${(endTime - startTime) / 1000} seconds`;
    return {
      ...output!,
      generationTime,
    };
  }
);
