<script setup lang='ts'>
import { ref, computed, Ref } from 'vue'
import Todo from './Todo.vue'
import { isString } from '@/utils/type';
type todoType = {
    text: string;
    done: boolean;
}
type filtersType = {
    [key: string]: (todos: todoType[]) => todoType[];
}
const visibility: Ref<string | number> = ref('all')
const todos: Ref<todoType[]> = ref([
    { text: 'star this repository', done: false },
    { text: 'fork this repository', done: false },
    { text: 'follow author', done: false },
    { text: 'vue-element-admin', done: true },
    { text: 'vue', done: true },
    { text: 'element-ui', done: true },
    { text: 'axios', done: true },
    { text: 'webpack', done: true }
])
const filters: filtersType = {
    all: (todos: todoType[]) => todos,
    active: (todos: todoType[]) => todos.filter(todo => !todo.done),
    completed: (todos: todoType[]) => todos.filter(todo => todo.done)
}

const allChecked = computed(() => {
    return todos.value.every(todo => todo.done)
})
const filteredTodos = computed(() => {
    let key = visibility.value
    return filters[key](todos.value)
})
const remaining = computed(() => {
    return todos.value.filter(todo => !todo.done).length
})
const pluralize = (w: string) => remaining.value === 1 ? w : w + 's'
const capitalize = (s: string | number) => {
    return isString(s) && s.charAt(0).toUpperCase() + s.slice(1)
}

const addTodo = (e: any) => {
    const text = e.target.value
    if (text.trim()) {
        todos.value.push({ text, done: false })
    }
    e.target.value = ''
}
const toggleAll = (done: boolean) => {
    todos.value.forEach(todo => {
        todo.done = done
    })
}
const toggleTodo = (val: todoType) => {
    val.done = !val.done
}
const deleteTodo = (todo: todoType) => {
    todos.value.splice(todos.value.indexOf(todo), 1)
}
const editTodo = (item: { todo: any; value: any; }) => {
    const { todo, value } = item
    todo.text = value
}
</script>
<template>
    <div class="get-todo-list-container">
        <!-- header -->
        <header class="header">
            <input class="add-todo" autocomplete="off" placeholder="Add Todo" @keyup.enter="addTodo" />
        </header>
        <!-- main -->
        <section v-show="todos.length" class="main">
            <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox"
                @change="toggleAll(!allChecked)">
            <label for="toggle-all" />
            <ul class="todo-list">
                <todo v-for="(todo, index) in filteredTodos" :key="index" :todo="todo" @toggleTodo="toggleTodo(todo)"
                    @editTodo="editTodo" @deleteTodo="deleteTodo">
                </todo>
            </ul>
        </section>
        <!-- footer -->
        <footer v-show="todos.length" class="footer">
            <span class="todo-count">
                <strong>{{ remaining }}</strong>
                {{ pluralize('item') }} left
            </span>
            <ul class="filters">
                <li v-for="(_, key) in filters" :key="key">
                    <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ capitalize(key)
                        }}</a>
                </li>
            </ul>
        </footer>
    </div>
</template>
<style lang='scss' scoped>
@include get(todo-list-container) {
    position: relative;
    width: 100%;
    line-height: 1.4em;
    font-weight: 300;
    @include get-text-color('color');
    @include get-box-shadow('color-item-shadow');
    @include get-bg-color('background-color');
    z-index: 1;

    input:focus-visible,
    input:hover,
    input:focus {
        outline: none;
        border: none;
    }

    input::-webkit-input-placeholder {
        font-weight: 300;
        @include get-bg-color('background-color');
    }

    input::-moz-placeholder {
        font-weight: 300;
        @include get-bg-color('background-color');
    }

    input::input-placeholder {
        font-weight: 300;
        @include get-bg-color('background-color');
    }

    .add-todo,
    .edit {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 18px;
        line-height: 1.4em;
        border: 0;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        -webkit-box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .add-todo {
        padding: 10px 16px 16px 60px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        -webkit-box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }


    .main {
        position: relative;
        z-index: 2;
        border-top: 1px solid #e6e6e6;

        .toggle-all {
            text-align: center;
            border: none;
            /* Mobile Safari */
            opacity: 0;
            position: absolute;

            &+label {
                width: 60px;
                height: 34px;
                font-size: 0;
                position: absolute;
                top: -52px;
                left: -13px;
                -webkit-transform: rotate(90deg);
                transform: rotate(90deg);
            }

            &+label:before {
                content: '❯';
                font-size: 22px;
                color: #e6e6e6;
                padding: 10px 27px 10px 27px;
            }

            &:checked+label:before {
                color: #737373;
            }
        }

        .todo-list {
            margin: 0;
            padding: 0;
            list-style: none;


        }
    }

    .footer {
        @include get-text-color('color1');
        position: relative;
        padding: 10px 15px;
        height: 40px;
        text-align: center;
        border-top: 1px solid #e6e6e6;
    }

    .footer:before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 40px;
        overflow: hidden;
    }

    .todo-count {
        float: left;
        text-align: left;
    }

    .todo-count strong {
        font-weight: 300;
    }

    .filters {
        margin: 0;
        padding: 0;
        position: relative;
        z-index: 1;
        list-style: none;
    }

    .filters li {
        display: inline;
    }

    .filters li a {
        font-size: 12px;
        padding: 3px 7px;
        text-decoration: none;
        border-radius: 3px;
        cursor: pointer;
    }

    .filters li a:hover {
        @include get-border-color('color1');
    }

    .filters li a.selected {
        @include get-border-color('color1');
    }

}
</style>