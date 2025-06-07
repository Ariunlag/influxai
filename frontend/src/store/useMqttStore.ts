import { create } from 'zustand';

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

export const useMqttStore = create<MqttState>((set, get) => ({
  topics: [],
  messages: [],
  duplicates: [],
  duplicateMsgs: [],

  addTopic: (topic) => {
    const { topics } = get();
    if (!topics.includes(topic)) {
      set({ topics: [...topics, topic] });
    }
  },

  removeTopic: (topic) => {
    const { topics } = get();
    set({ topics: topics.filter((t) => t !== topic) });
  },

  addMessage: (msg) => {
    const { messages } = get();
    set({ messages: [...messages, msg] });
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
}));
