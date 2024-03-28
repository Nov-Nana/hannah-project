<script setup lang='ts'>
import { ref } from 'vue'

type todoType = {
    text: string;
    done: boolean;
}
const props = defineProps(['todo'])
const emits = defineEmits(['toggleTodo', 'editTodo', 'deleteTodo'])
let editing = ref(false)

const deleteTodo = (todo: todoType) => {
    emits('deleteTodo', todo)
}
const editTodo = (todo: todoType, value: any) => {
    emits('editTodo', { todo, value })
}
const toggleTodo = (todo: todoType) => {
    emits('toggleTodo', todo)
}
const doneEdit = (e: any) => {
    const value = e.target.value.trim()
    if (!value) {
        deleteTodo(props.todo)
    } else if (editing.value) {
        editTodo(props.todo, value)
        editing.value = false
    }
}
const cancelEdit = (e: any) => {
    e.target.value = props.todo.text
    editing.value = false
}

const vFocus = {
    updated(el: any, binding: any) {
        if (binding.value) {
            el.focus()
        }
    }
};
</script>
<template>
    <li class="get-todo-box">
        <div :class="{ completed: todo.done, editing: editing }" class="view">
            <input :checked="todo.done" class="toggle" type="checkbox" @change="toggleTodo(todo)">
            <label @dblclick="editing = true" v-text="todo.text" />
            <button class="destroy" @click="deleteTodo(todo)" />
        </div>
        <input v-show="editing" v-focus="editing" :value="todo.text" class="edit" @keyup.enter="doneEdit"
            @keyup.esc="cancelEdit" @blur="doneEdit">
    </li>
</template>
<style scoped lang="scss">
@include get(todo-box) {
    position: relative;
    border-bottom: 1px solid #ededed;
    height: 44px;
    box-sizing: border-box;

    &:last-child {
        border-bottom: none;
    }

    .editing {
        border-bottom: none;
        padding: 0;
    }

    .editing+.edit {
        display: block;
        width: 70%;
        padding: 12px 16px;
        margin: 0 0 0 43px;
    }

    .editing.view {
        display: none;
    }

    .toggle {
        opacity: 0;
        text-align: center;
        width: 40px;
        /* auto, since non-WebKit browsers doesn't support input styling */
        height: 40px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none;
        /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
    }

    .toggle+label {
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
        background-repeat: no-repeat;
        background-position: center left;
        background-size: 36px;
    }

    .toggle:checked+label {
        background-size: 36px;
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
    }

    label {
        word-break: break-all;
        padding: 15px 15px 15px 50px;
        display: block;
        line-height: 1.0;
        font-size: 14px;
        transition: color 0.4s;
    }

    & .completed label {
        color: #d9d9d9;
        text-decoration: line-through;
    }

    .destroy {
        display: none;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        @include get-text-color('color');
        transition: color 0.2s ease-out;
        cursor: pointer;
        background-color: transparent;
        border: none;
    }

    // .destroy:hover {
    //     color: #af5b5e;
    // }

    .destroy:after {
        content: '×';
    }

    &:hover .destroy {
        display: block;
    }

    .edit {
        display: none;
    }

    input.edit {
        // @include get-bg-color('')
        background-color: transparent;
        @include get-text-color('color');
        
        &:focus {
            outline: none;
            border: none;
        }
    }

    &.editing:last-child {
        margin-bottom: -1px;
    }


}
</style>