<script>
  import { PrismicRichText } from "@prismicio/svelte"

  /** @type {import("@prismicio/client").Content.RichTextSlice} */
  export let slice
</script>

<PrismicRichText
  field={slice.primary.content}
  components={{
    // label: Label
  }}
/>
