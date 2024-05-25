function isMetagram(word1, word2) {
    if (word1.length !== word2.length) {
        return false;
    }

    let diffCount = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word1[i] !== word2[i]) {
            diffCount++;
        }
        if (diffCount > 1) {
            return false;
        }
    }

    return diffCount === 1;
}

function buildGraph(words) {
    let graph = {};
    for (let word of words) {
        graph[word] = [];
    }
    for (let word of words) {
        for (let otherWord of words) {
            if (isMetagram(word, otherWord)) {
                graph[word].push(otherWord);
            }
        }
    }
    console.log("Граф:", graph);
    return graph;
}

function bidirectionalBFS(graph, start, end) {
    if (start === end) return [start];

    if (!graph[start] || !graph[end]) {
        console.error(`Одно из слов "${start}" или "${end}" отсутствует в графе.`);
        return null;
    }

    let queueStart = [start];
    let queueEnd = [end];
    let visitedStart = new Set([start]);
    let visitedEnd = new Set([end]);
    let parentStart = new Map([[start, null]]);
    let parentEnd = new Map([[end, null]]);

    while (queueStart.length > 0 && queueEnd.length > 0) {
        /* console.log(`Очередь начала: ${queueStart}`);
        console.log(`Очередь конца: ${queueEnd}`);
        console.log(`Посещенные начала: ${Array.from(visitedStart)}`);
        console.log(`Посещенные конца: ${Array.from(visitedEnd)}`); */

        if (expandLevel(graph, queueStart, visitedStart, visitedEnd, parentStart)) {
            console.log("Путь найден через расширение очереди начала");
            return constructPath(parentStart, parentEnd);
        }
        if (expandLevel(graph, queueEnd, visitedEnd, visitedStart, parentEnd)) {
            console.log("Путь найден через расширение очереди конца");
            return constructPath(parentEnd, parentStart, true);
        }
    }
    return null;
}

function expandLevel(graph, queue, visitedThisSide, visitedOtherSide, parent) {
    let levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
        let node = queue.shift();
        /* console.log(`Расширение узла: ${node}`); */
        if (!graph[node]) {
            console.error(`Узел "${node}" отсутствует в графе.`);
            continue;
        }
        for (let neighbor of graph[node]) {
            /* console.log(`Проверка соседа: ${neighbor}`); */
            if (!visitedThisSide.has(neighbor)) {
                visitedThisSide.add(neighbor);
                parent.set(neighbor, node);
                queue.push(neighbor);
                /* console.log(`Добавлен ${neighbor} в очередь`); */
                if (visitedOtherSide.has(neighbor)) {
                    console.log(`Сосед ${neighbor} посещен с другой стороны`);
                    return true;
                }
            }
        }
    }
    return false;
}

function constructPath(parentStart, parentEnd, reverse = false) {
    let intersection = null;
    for (let node of parentStart.keys()) {
        if (parentEnd.has(node)) {
            intersection = node;
            break;
        }
    }

    if (!intersection) return null;

    let path = [];
    let node = intersection;

    while (node) {
        path.push(node);
        node = parentStart.get(node);
    }
    path.reverse();

    node = parentEnd.get(intersection);
    while (node) {
        path.push(node);
        node = parentEnd.get(node);
    }

    return reverse ? path.reverse() : path;
}

let words = ["ЛУЖА","МУЗА","ЛИРА","МЕХА","ЛИГА","ТАРА","ЛИПА","ТУРА","ПАРК","ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"];

// Убедимся, что начальное и конечное слова включены в список слов
let startWord = "МУХА";
let endWord = "СЛОН";

if (!words.includes(startWord)) words.push(startWord);
if (!words.includes(endWord)) words.push(endWord);

let startWord1 = "ЛИСА";
let endWord1 = "ЛОСЬ";

if (!words.includes(startWord1)) words.push(startWord1);
if (!words.includes(endWord1)) words.push(endWord1);

let graph = buildGraph(words);

console.log(bidirectionalBFS(graph, startWord, endWord).join('-'));
console.log(bidirectionalBFS(graph, startWord1, endWord1).join('-'));
