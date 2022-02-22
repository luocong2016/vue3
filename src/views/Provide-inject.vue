<script lang="tsx">
import { defineComponent, ref, reactive, readonly, provide, inject, Ref, computed } from 'vue';

export interface Geolocation {
  longitude: number;
  latitude: number;
}

export type UpdateLocation = (...args: any[]) => any;

export const MyMarker = defineComponent({
  setup() {
    const location = inject('location') as Ref<unknown>;
    const geolocation = inject('geolocation') as Geolocation;
    const updateUserLocation = inject('updateLocation') as UpdateLocation;
    const toggle = computed<string>(() => {
      return location.value === 'North Pole' ? 'South Pole' : 'North Pole';
    });

    return () => (
      <div>
        <div>location: {location.value}</div>
        <div>
          geolocation: {geolocation.longitude},{geolocation.latitude}
        </div>
        <button onClick={() => updateUserLocation(toggle.value)}>update location: {toggle.value}</button>
      </div>
    );
  },
});

export default defineComponent({
  setup() {
    const location = ref('North Pole');
    const geolocation = reactive<Geolocation>({
      longitude: 90,
      latitude: 135,
    });
    const updateLocation: UpdateLocation = (v: string) => {
      location.value = v;
    };

    provide('location', readonly(location));
    provide('geolocation', readonly(geolocation));
    provide('updateLocation', updateLocation);

    return () => (
      <div>
        <MyMarker />
      </div>
    );
  },
});
</script>
