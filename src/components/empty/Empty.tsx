import { type ExtractPropTypes, defineComponent } from 'vue';
import { numericProp, makeStringProp, createNamespace, getSizeStyle } from '@/utils';
import { Network } from './Network';

const images: { [key: string]: string } = {
  error: require('@/assets/empty-image-error.png'),
  search: require('@/assets/empty-image-search.png'),
  default: require('@/assets/empty-image-default.png'),
}

const [name, bem] = createNamespace('empty');
const PRESET_IMAGES = ['error', 'search', 'default'];
const emptyProps = {
  image: makeStringProp('default'),
  imageSize: numericProp,
  description: String,
};

export type EmptyProps = ExtractPropTypes<typeof emptyProps>;

export default defineComponent({
  name,

  props: emptyProps,

  setup(props, { slots }) {
    const renderImage = () => {
      if (slots.image) {
        return slots.image();
      }
      let { image } = props;
      if (image === 'network') {
        return Network;
      }
      if (PRESET_IMAGES.includes(image)) {
        image = images[image]
      }
      return <img src={image} />
    };

    const renderDescriotion = () => {
      const description = slots.description ? slots.description() : props.description;
      if (description) {
        return <p class={bem('description')}>{description}</p>;
      }
    };

    const renderBottom = () => {
      if (slots.default) {
        return <div class={bem('button')}>{slots.default()}</div>;
      }
    }

    return () => <div class={bem()}>
      <div class={bem('image')} style={getSizeStyle(props.imageSize)}>
        {renderImage()}
      </div>
      {renderDescriotion()}
      {renderBottom()}
    </div>;
  }
});
