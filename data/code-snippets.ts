// Code snippets for typing practice - realistic code examples
// Each snippet is an array of lines to preserve formatting

import { Difficulty } from "./quotes";

export interface CodeSnippet {
  language: string;
  lines: string[];
  difficulty: Difficulty;
}

export const javascriptSnippets: CodeSnippet[] = [
  {
    language: "javascript",
    difficulty: "easy",
    lines: [
      "function fibonacci(n) {",
      "  if (n <= 1) return n;",
      "  return fibonacci(n - 1) + fibonacci(n - 2);",
      "}",
    ],
  },
  {
    language: "javascript",
    difficulty: "easy",
    lines: [
      "const fetchData = async (url) => {",
      "  const response = await fetch(url);",
      "  const data = await response.json();",
      "  return data;",
      "};",
    ],
  },
  {
    language: "javascript",
    difficulty: "easy",
    lines: [
      "const users = items.filter(item => item.active)",
      "  .map(item => item.name)",
      "  .sort((a, b) => a.localeCompare(b));",
    ],
  },
  {
    language: "javascript",
    difficulty: "hard",
    lines: [
      "class EventEmitter {",
      "  constructor() {",
      "    this.events = {};",
      "  }",
      "  on(event, callback) {",
      "    if (!this.events[event]) {",
      "      this.events[event] = [];",
      "    }",
      "    this.events[event].push(callback);",
      "  }",
      "}",
    ],
  },
  {
    language: "javascript",
    difficulty: "medium",
    lines: [
      "const debounce = (fn, delay) => {",
      "  let timeoutId;",
      "  return (...args) => {",
      "    clearTimeout(timeoutId);",
      "    timeoutId = setTimeout(() => fn(...args), delay);",
      "  };",
      "};",
    ],
  },
];

export const typescriptSnippets: CodeSnippet[] = [
  {
    language: "typescript",
    difficulty: "easy",
    lines: [
      "interface User {",
      "  id: number;",
      "  name: string;",
      "  email: string;",
      "  isActive: boolean;",
      "}",
    ],
  },
  {
    language: "typescript",
    difficulty: "easy",
    lines: [
      "type Result<T, E> = ",
      "  | { success: true; data: T }",
      "  | { success: false; error: E };",
    ],
  },
  {
    language: "typescript",
    difficulty: "medium",
    lines: [
      "function useState<T>(initial: T): [T, (v: T) => void] {",
      "  let state = initial;",
      "  const setState = (value: T) => { state = value; };",
      "  return [state, setState];",
      "}",
    ],
  },
  {
    language: "typescript",
    difficulty: "medium",
    lines: [
      "const fetchUser = async (id: number): Promise<User> => {",
      "  const response = await fetch(`/api/users/${id}`);",
      "  if (!response.ok) throw new Error('Not found');",
      "  return response.json();",
      "};",
    ],
  },
];

export const pythonSnippets: CodeSnippet[] = [
  {
    language: "python",
    difficulty: "hard",
    lines: [
      "def quicksort(arr):",
      "    if len(arr) <= 1:",
      "        return arr",
      "    pivot = arr[len(arr) // 2]",
      "    left = [x for x in arr if x < pivot]",
      "    middle = [x for x in arr if x == pivot]",
      "    right = [x for x in arr if x > pivot]",
      "    return quicksort(left) + middle + quicksort(right)",
    ],
  },
  {
    language: "python",
    difficulty: "medium",
    lines: [
      "class DataProcessor:",
      "    def __init__(self, data):",
      "        self.data = data",
      "",
      "    def process(self):",
      "        return [item.strip() for item in self.data]",
    ],
  },
  {
    language: "python",
    difficulty: "medium",
    lines: [
      "from typing import List, Optional",
      "",
      "def find_max(numbers: List[int]) -> Optional[int]:",
      "    if not numbers:",
      "        return None",
      "    return max(numbers)",
    ],
  },
  {
    language: "python",
    difficulty: "easy",
    lines: [
      "async def fetch_all(urls):",
      "    async with aiohttp.ClientSession() as session:",
      "        tasks = [fetch(session, url) for url in urls]",
      "        return await asyncio.gather(*tasks)",
    ],
  },
];

export const rustSnippets: CodeSnippet[] = [
  {
    language: "rust",
    difficulty: "medium",
    lines: [
      "fn fibonacci(n: u32) -> u32 {",
      "    match n {",
      "        0 => 0,",
      "        1 => 1,",
      "        _ => fibonacci(n - 1) + fibonacci(n - 2),",
      "    }",
      "}",
    ],
  },
  {
    language: "rust",
    difficulty: "hard",
    lines: [
      "struct User {",
      "    id: u64,",
      "    name: String,",
      "    email: String,",
      "}",
      "",
      "impl User {",
      "    fn new(id: u64, name: &str) -> Self {",
      "        Self { id, name: name.to_string(), email: String::new() }",
      "    }",
      "}",
    ],
  },
  {
    language: "rust",
    difficulty: "easy",
    lines: [
      "fn parse_number(s: &str) -> Result<i32, ParseIntError> {",
      "    let n = s.trim().parse::<i32>()?;",
      "    Ok(n * 2)",
      "}",
    ],
  },
];

export const golangSnippets: CodeSnippet[] = [
  {
    language: "golang",
    difficulty: "hard",
    lines: [
      "func main() {",
      '    http.HandleFunc("/", handler)',
      '    log.Fatal(http.ListenAndServe(":8080", nil))',
      "}",
      "",
      "func handler(w http.ResponseWriter, r *http.Request) {",
      '    fmt.Fprintf(w, "Hello, World!")',
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "easy",
    lines: [
      "type User struct {",
      '    ID    int    `json:"id"`',
      '    Name  string `json:"name"`',
      '    Email string `json:"email"`',
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "medium",
    lines: [
      "func worker(jobs <-chan int, results chan<- int) {",
      "    for j := range jobs {",
      "        results <- j * 2",
      "    }",
      "}",
    ],
  },
];

export const javaSnippets: CodeSnippet[] = [
  {
    language: "java",
    difficulty: "easy",
    lines: [
      "public class Main {",
      "    public static void main(String[] args) {",
      '        System.out.println("Hello, World!");',
      "    }",
      "}",
    ],
  },
  {
    language: "java",
    difficulty: "hard",
    lines: [
      "public class User {",
      "    private String name;",
      "    private int age;",
      "",
      "    public User(String name, int age) {",
      "        this.name = name;",
      "        this.age = age;",
      "    }",
      "",
      "    public String getName() { return name; }",
      "}",
    ],
  },
  {
    language: "java",
    difficulty: "medium",
    lines: [
      "List<String> filtered = items.stream()",
      "    .filter(s -> s.length() > 3)",
      "    .map(String::toUpperCase)",
      "    .collect(Collectors.toList());",
    ],
  },
];

export const cSnippets: CodeSnippet[] = [
  {
    language: "c",
    difficulty: "easy",
    lines: [
      "#include <stdio.h>",
      "",
      "int main() {",
      '    printf("Hello, World!\\n");',
      "    return 0;",
      "}",
    ],
  },
  {
    language: "c",
    difficulty: "easy",
    lines: [
      "void swap(int *a, int *b) {",
      "    int temp = *a;",
      "    *a = *b;",
      "    *b = temp;",
      "}",
    ],
  },
  {
    language: "c",
    difficulty: "hard",
    lines: [
      "struct Node {",
      "    int data;",
      "    struct Node *next;",
      "};",
      "",
      "void insert(struct Node **head, int data) {",
      "    struct Node *new = malloc(sizeof(struct Node));",
      "    new->data = data;",
      "    new->next = *head;",
      "    *head = new;",
      "}",
    ],
  },
];

export const cppSnippets: CodeSnippet[] = [
  {
    language: "cpp",
    difficulty: "hard",
    lines: [
      "#include <iostream>",
      "#include <vector>",
      "",
      "int main() {",
      "    std::vector<int> nums = {1, 2, 3, 4, 5};",
      "    for (int n : nums) {",
      "        std::cout << n << std::endl;",
      "    }",
      "    return 0;",
      "}",
    ],
  },
  {
    language: "cpp",
    difficulty: "medium",
    lines: [
      "class Rectangle {",
      "private:",
      "    int width, height;",
      "public:",
      "    Rectangle(int w, int h) : width(w), height(h) {}",
      "    int area() const { return width * height; }",
      "};",
    ],
  },
];

export const csharpSnippets: CodeSnippet[] = [
  {
    language: "csharp",
    difficulty: "easy",
    lines: [
      "public class Program {",
      "    public static void Main(string[] args) {",
      '        Console.WriteLine("Hello, World!");',
      "    }",
      "}",
    ],
  },
  {
    language: "csharp",
    difficulty: "medium",
    lines: [
      "public record User(int Id, string Name, string Email);",
      "",
      "var users = await context.Users",
      "    .Where(u => u.IsActive)",
      "    .OrderBy(u => u.Name)",
      "    .ToListAsync();",
    ],
  },
];

export const rubySnippets: CodeSnippet[] = [
  {
    language: "ruby",
    difficulty: "hard",
    lines: [
      "class User",
      "  attr_accessor :name, :email",
      "",
      "  def initialize(name, email)",
      "    @name = name",
      "    @email = email",
      "  end",
      "",
      "  def greet",
      '    puts "Hello, #{@name}!"',
      "  end",
      "end",
    ],
  },
  {
    language: "ruby",
    difficulty: "easy",
    lines: [
      "numbers = [1, 2, 3, 4, 5]",
      "squared = numbers.map { |n| n ** 2 }",
      "evens = squared.select { |n| n.even? }",
      "puts evens.sum",
    ],
  },
];

export const phpSnippets: CodeSnippet[] = [
  {
    language: "php",
    difficulty: "medium",
    lines: [
      "<?php",
      "class UserController {",
      "    public function index() {",
      "        $users = User::all();",
      "        return view('users.index', compact('users'));",
      "    }",
      "}",
    ],
  },
  {
    language: "php",
    difficulty: "easy",
    lines: [
      "<?php",
      "function factorial(int $n): int {",
      "    if ($n <= 1) return 1;",
      "    return $n * factorial($n - 1);",
      "}",
    ],
  },
];

export const swiftSnippets: CodeSnippet[] = [
  {
    language: "swift",
    difficulty: "hard",
    lines: [
      "struct User: Codable {",
      "    let id: Int",
      "    let name: String",
      "    let email: String",
      "}",
      "",
      "func fetchUsers() async throws -> [User] {",
      '    let url = URL(string: "https://api.example.com/users")!',
      "    let (data, _) = try await URLSession.shared.data(from: url)",
      "    return try JSONDecoder().decode([User].self, from: data)",
      "}",
    ],
  },
  {
    language: "swift",
    difficulty: "easy",
    lines: [
      "enum Result<T, E: Error> {",
      "    case success(T)",
      "    case failure(E)",
      "}",
    ],
  },
];

export const kotlinSnippets: CodeSnippet[] = [
  {
    language: "kotlin",
    difficulty: "hard",
    lines: [
      "data class User(val id: Int, val name: String, val email: String)",
      "",
      "fun main() {",
      "    val users = listOf(",
      '        User(1, "Alice", "alice@example.com"),',
      '        User(2, "Bob", "bob@example.com")',
      "    )",
      '    users.filter { it.name.startsWith("A") }',
      "        .forEach { println(it) }",
      "}",
    ],
  },
  {
    language: "kotlin",
    difficulty: "medium",
    lines: [
      "suspend fun fetchData(): Result<String> {",
      "    return try {",
      "        val response = client.get(url)",
      "        Result.success(response.body())",
      "    } catch (e: Exception) {",
      "        Result.failure(e)",
      "    }",
      "}",
    ],
  },
];

export const scalaSnippets: CodeSnippet[] = [
  {
    language: "scala",
    difficulty: "hard",
    lines: [
      "case class User(id: Int, name: String, email: String)",
      "",
      "object Main extends App {",
      "  val users = List(",
      '    User(1, "Alice", "alice@example.com"),',
      '    User(2, "Bob", "bob@example.com")',
      "  )",
      '  users.filter(_.name.startsWith("A")).foreach(println)',
      "}",
    ],
  },
];

export const luaSnippets: CodeSnippet[] = [
  {
    language: "lua",
    difficulty: "medium",
    lines: [
      "function factorial(n)",
      "    if n <= 1 then",
      "        return 1",
      "    end",
      "    return n * factorial(n - 1)",
      "end",
      "",
      "print(factorial(5))",
    ],
  },
  {
    language: "lua",
    difficulty: "hard",
    lines: [
      "local User = {}",
      "User.__index = User",
      "",
      "function User:new(name)",
      "    local self = setmetatable({}, User)",
      "    self.name = name",
      "    return self",
      "end",
    ],
  },
];

export const zigSnippets: CodeSnippet[] = [
  {
    language: "zig",
    difficulty: "medium",
    lines: [
      'const std = @import("std");',
      "",
      "pub fn main() void {",
      "    const stdout = std.io.getStdOut().writer();",
      '    stdout.print("Hello, World!\\n", .{}) catch {};',
      "}",
    ],
  },
];

export const liquidSnippets: CodeSnippet[] = [
  {
    language: "liquid",
    difficulty: "easy",
    lines: [
      "{% if product.available %}",
      "  <span>{{ product.price | money }}</span>",
      "{% else %}",
      "  <span>Sold out</span>",
      "{% endif %}",
    ],
  },
  {
    language: "liquid",
    difficulty: "easy",
    lines: [
      "{% for item in cart.items %}",
      "  <div>{{ item.product.title }}</div>",
      "  <span>{{ item.quantity }}</span>",
      "{% endfor %}",
    ],
  },
  {
    language: "liquid",
    difficulty: "medium",
    lines: [
      "{% assign featured = collections.frontpage.products %}",
      "{% for product in featured limit: 4 %}",
      '  <div class="product-card">',
      "    <img src=\"{{ product.featured_image | img_url: 'medium' }}\">",
      "    <h3>{{ product.title }}</h3>",
      "    <p>{{ product.price | money }}</p>",
      "  </div>",
      "{% endfor %}",
    ],
  },
  {
    language: "liquid",
    difficulty: "medium",
    lines: [
      "{% paginate collection.products by 12 %}",
      "  {% for product in collection.products %}",
      "    {% render 'product-card', product: product %}",
      "  {% endfor %}",
      "  {{ paginate | default_pagination }}",
      "{% endpaginate %}",
    ],
  },
  {
    language: "liquid",
    difficulty: "hard",
    lines: [
      "{% schema %}",
      "{",
      '  "name": "Featured Collection",',
      '  "settings": [',
      "    {",
      '      "type": "collection",',
      '      "id": "collection",',
      '      "label": "Collection"',
      "    },",
      "    {",
      '      "type": "range",',
      '      "id": "products_to_show",',
      '      "min": 2,',
      '      "max": 12,',
      '      "default": 4,',
      '      "label": "Products to show"',
      "    }",
      "  ]",
      "}",
      "{% endschema %}",
    ],
  },
  {
    language: "liquid",
    difficulty: "hard",
    lines: [
      "{% capture product_form_id %}product-form-{{ section.id }}{% endcapture %}",
      "{% form 'product', product, id: product_form_id %}",
      '  <select name="id">',
      "    {% for variant in product.variants %}",
      '      <option value="{{ variant.id }}">',
      "        {{ variant.title }} - {{ variant.price | money }}",
      "      </option>",
      "    {% endfor %}",
      "  </select>",
      '  <button type="submit">Add to cart</button>',
      "{% endform %}",
    ],
  },
];

export function getSnippetsByLanguage(language: string): CodeSnippet[] {
  switch (language) {
    case "javascript":
      return javascriptSnippets;
    case "typescript":
      return typescriptSnippets;
    case "python":
      return pythonSnippets;
    case "rust":
      return rustSnippets;
    case "golang":
      return golangSnippets;
    case "java":
      return javaSnippets;
    case "c":
      return cSnippets;
    case "cpp":
      return cppSnippets;
    case "csharp":
      return csharpSnippets;
    case "ruby":
      return rubySnippets;
    case "php":
      return phpSnippets;
    case "swift":
      return swiftSnippets;
    case "kotlin":
      return kotlinSnippets;
    case "scala":
      return scalaSnippets;
    case "lua":
      return luaSnippets;
    case "zig":
      return zigSnippets;
    case "liquid":
      return liquidSnippets;
    default:
      return javascriptSnippets;
  }
}

export function getRandomSnippet(language: string): CodeSnippet {
  const snippets = getSnippetsByLanguage(language);
  return snippets[Math.floor(Math.random() * snippets.length)];
}

// Get all snippets across all languages
function getAllSnippets(): CodeSnippet[] {
  return [
    ...javascriptSnippets,
    ...typescriptSnippets,
    ...pythonSnippets,
    ...rustSnippets,
    ...golangSnippets,
    ...javaSnippets,
    ...cSnippets,
    ...cppSnippets,
    ...csharpSnippets,
    ...rubySnippets,
    ...phpSnippets,
    ...swiftSnippets,
    ...kotlinSnippets,
    ...scalaSnippets,
    ...luaSnippets,
    ...zigSnippets,
    ...liquidSnippets,
  ];
}

export function getRandomSnippetByDifficulty(
  language: string,
  difficulty: Difficulty,
): CodeSnippet {
  // If language is "all", search across all languages
  const snippets =
    language === "all" ? getAllSnippets() : getSnippetsByLanguage(language);

  // Filter by difficulty
  const filtered = snippets.filter((s) => s.difficulty === difficulty);

  // If no snippets match the difficulty for this language, fall back to any snippet
  if (filtered.length === 0) {
    return snippets[Math.floor(Math.random() * snippets.length)];
  }

  return filtered[Math.floor(Math.random() * filtered.length)];
}
