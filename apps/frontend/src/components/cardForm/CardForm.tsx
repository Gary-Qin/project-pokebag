import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cardSets } from "@/constants/cardSets";
import { CardInfo } from "@/constants/cardInfo";
import { CardFormSchema } from "./schema";

import axios from "axios";
import { useState } from "react";

type CardFormProps = {
  allCards: CardInfo[];
  setAllCards: React.Dispatch<React.SetStateAction<CardInfo[]>>;
  setCurrentCard: React.Dispatch<React.SetStateAction<CardInfo | undefined>>;
};

export const CardForm = ({
  allCards,
  setAllCards,
  setCurrentCard,
}: CardFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof CardFormSchema>>({
    resolver: zodResolver(CardFormSchema),
  });
  const [comboboxOpen, setComboboxOpen] = useState(false);

  const onSubmit = async (data: z.infer<typeof CardFormSchema>) => {
    const url = `https://api.pokemontcg.io/v2/cards/${data.cardSet}-${data.cardNum}`;

    try {
      const response = await axios.get(url);
      const data = await response.data.data;

      setCurrentCard({
        id: data.id,
        cardName: data.name,
        setName: data.set.name,
        imageSrc: data.images.small,
        tcgplayer: {
          normal: {
            market: data.tcgplayer.prices.normal?.market,
          },
          holofoil: {
            market: data.tcgplayer.prices.holofoil?.market,
          },
          reverseHolofoil: {
            market: data.tcgplayer.prices.reverseHolofoil?.market,
          },
        },
      });

      setAllCards((prev) => [
        ...prev,
        {
          id: data.id,
          cardName: data.name,
          setName: data.set.name,
          imageSrc: data.images.small,
          tcgplayer: {
            normal: {
              market: data.tcgplayer.prices.normal?.market,
            },
            holofoil: {
              market: data.tcgplayer.prices.holofoil?.market,
            },
            reverseHolofoil: {
              market: data.tcgplayer.prices.reverseHolofoil?.market,
            },
          },
        },
      ]);
      console.log(allCards);
    } catch (e) {
      let message;
      if (e instanceof Error) message = e.message;
      else message = String(e);
      reportError({ message });
    }

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 my-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="cardSet"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Card Set</FormLabel>
              <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={comboboxOpen}
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? cardSets.find(
                            (cardSet) => cardSet.value === field.value
                          )?.label
                        : "Select card set"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search card sets..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No set found.</CommandEmpty>
                      <CommandGroup>
                        {cardSets.map((cardSet) => (
                          <CommandItem
                            value={cardSet.label}
                            key={cardSet.value}
                            onSelect={() => {
                              form.setValue("cardSet", cardSet.value);
                              setComboboxOpen(false);
                            }}
                          >
                            {cardSet.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                cardSet.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                To determine set name by set symbol, go to{" "}
                <a href="https://pokesymbols.com/tcg/sets">
                  https://pokesymbols.com/tcg/sets
                </a>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardNum"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Set Number</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  placeholder="Enter set number"
                  className=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
