import { z } from 'zod';
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { CardImage } from '@/components/card/CardImage';
import { parseYdkDeck } from '@/lib/parse';

export type DeckFormData = z.infer<typeof deckFormSchema>;
export const deckFormSchema = z.object({
  name: z.string(),
  kind: z.string(),
  year: z.number().optional(),
  month: z.number().optional(),
  game: z.string().optional(),
  rank: z.number().optional(),
  picks: z.number().array().length(3).optional(),
  main: z.number().array(),
  extra: z.number().array(),
  side: z.number().array(),
});

const readFileAsText = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result?.toString() ?? '');
    reader.onerror = reject;
  });

const convertNumberToValue = (n?: number) =>
  n === undefined ? undefined : String(n);

const createYears = () => {
  const result: string[] = [];
  let currentYear = new Date().getFullYear();

  while (currentYear >= 2000) {
    result.push(String(currentYear));
    currentYear -= 1;
  }

  return result;
};
const createMonths = () =>
  Array.from({ length: 12 }).map((_, i) => String(i + 1));

const years = createYears();
const months = createMonths();

interface DeckFormProps {
  onSubmit: (data: DeckFormData) => void;
}

export const DeckForm = ({ onSubmit }: DeckFormProps) => {
  const form = useFormContext<DeckFormData>();
  const { handleSubmit, control, register, formState, setValue } = form;
  const { isSubmitting, isSubmitSuccessful } = formState;
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'text/plain': ['.ydk'] },
    multiple: false,
    onDrop: async ([file]) => {
      const text = await readFileAsText(file);
      const { main, extra, side } = parseYdkDeck(text);
      setValue('main', main);
      setValue('extra', extra);
      setValue('side', side);
      setValue('picks', []);
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormItem>
          <FormLabel className="after:content-['*'] after:ml-1">Name</FormLabel>
          <FormControl>
            <Input placeholder="Name" {...register('name')} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel className="after:content-['*'] after:ml-1">Kind</FormLabel>
          <FormControl>
            <Input placeholder="Kind" {...register('kind')} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Select
                    value={convertNumberToValue(field.value)}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="h-80">
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Month</FormLabel>
                <FormControl>
                  <Select
                    value={convertNumberToValue(field.value)}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-[3fr_1fr] gap-2">
          <FormItem>
            <FormLabel>Game</FormLabel>
            <FormControl>
              <Input placeholder="Game" {...register('game')} />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormField
            control={control}
            name="rank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rank</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Rank"
                    value={convertNumberToValue(field.value)}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="picks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Picks</FormLabel>
              <FormControl>
                <div className="flex h-[146px] outline outline-1 outline-muted">
                  {field.value?.map((id, index) => (
                    <div
                      key={index}
                      className="cursor-pointer"
                      onClick={() =>
                        field.value &&
                        field.onChange([
                          ...field.value.slice(0, index),
                          ...field.value.slice(index + 1),
                        ])
                      }
                    >
                      <CardImage cardId={id} width={100} height={146} />
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Deck File</FormLabel>
          <FormControl>
            <div
              {...getRootProps()}
              className="flex items-center justify-center h-24 border border-muted text-sm text-muted-foreground cursor-pointer"
            >
              <input {...getInputProps()} />
              Import deck file (ygopro .ydk)
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting || isSubmitSuccessful}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
