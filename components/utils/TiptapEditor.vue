<template>
  <div class="wrap-tiptap-editor">
    <div v-if="editor" class="toolbar">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        italic
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        strike
      </button>
      <button
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        undo
      </button>
      <button
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
      >
        redo
      </button>
    </div>
    <TiptapEditorContent :editor="editor" class="box-tiptap-editor" />
  </div>
</template>

<script setup>
import StarterKit from '@tiptap/starter-kit'

const props = defineProps({
  modelValue: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
  onUpdate({ editor }) {
    emit('update:modelValue', editor.getHTML())
  }
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (editor.value && editor.value.getHTML() !== newVal) {
      editor.value.commands.setContent(newVal || '', false)
    }
  }
)

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>

<style lang="scss" scoped>
.wrap-tiptap-editor {
  flex: 1;
}
.toolbar{
  display: flex;
  align-items: center;
  gap: 8px;
  // button{
  //   width: 18px;
  //   height: 18px;
  //   border: 1px solid #ededed;
  //   font-size: 0;
  //   background: black;
  // }
}
.box-tiptap-editor{
  min-height: 200px;
  border: 1px solid #ededed;
  border-radius: 4px;
  padding: 8px;
  overflow-y: auto;
  background-color: #fff;
  font-size: 14px;
  line-height: 1.5;
}
</style>