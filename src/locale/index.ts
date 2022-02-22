import _ from 'lodash';
import { ref, reactive } from 'vue';
import defaultMessages from './lang/zh-CN';

type Message = Record<string, any>;
type Messages = Record<string, Message>;

const lang = ref('zh-CN');
const messages = reactive<Messages>({
  'zh-CN': defaultMessages,
});

export const Locale = {
  messages(): Message {
    return messages[lang.value]
  },

  use(newLang: string, newMessages?: Message) {
    lang.value = newLang;
    this.add({ [newLang]: newMessages })
  },

  add(newMessages: Message = {}) {
    _.assign(messages, newMessages)
  },
};

export default Locale;
