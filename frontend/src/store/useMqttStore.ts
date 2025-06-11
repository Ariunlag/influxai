import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DuplicateGroup {
  topics: string[];
}

interface MqttState {
  topics: string[];
  messages: string[];
  duplicates: DuplicateGroup[];
  duplicateMsgs: string[];

  addTopic: (topic: string) => void;
  removeTopic: (topic: string) => void;
  addMessage: (msg: string) => void;
  setDuplicates: (groups: DuplicateGroup[]) => void;
  addDuplicateMsg: (msg: string) => void;
  clear: () => void;
}

export const useMqttStore = create<MqttState>()(
  persist(
    (set, get) => ({
      topics: [],
      messages: [],
      duplicates: [],
      duplicateMsgs: [],

      addTopic: (topic) => {
        console.log('[Store] Adding topic:', topic);
        const { topics } = get();
        if (!topics.includes(topic)) {
          set({ topics: [...topics, topic] });
        }
      },

      removeTopic: (topic) => {
        console.log('[Store] Removing topic:', topic);
        const { topics } = get();
        set({ topics: topics.filter((t) => t !== topic) });
      },

      addMessage: (msg) => {
        console.log('[Store] Adding message:', msg);
        const { messages } = get();
        set({ messages: [...messages, msg].slice(-300) });
      },

      setDuplicates: (groups) => {
        set({ duplicates: groups });
      },

      addDuplicateMsg: (msg) => {
        const { duplicateMsgs } = get();
        set({ duplicateMsgs: [...duplicateMsgs, msg] });
      },

      clear: () => {
        set({
          topics: [],
          messages: [],
          duplicates: [],
          duplicateMsgs: [],
        });
      },
    }),
    {
      name: 'mqtt-store', // localStorage key
    }
  )
);
