import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Home, BookOpen, User, ChevronLeft, ChevronDown, ChevronUp, Zap, X, RotateCcw,
  Mic, Maximize2, Delete, Check, Flame, Shield, Sparkles, Award, Clock, Target,
  ArrowRight, MessageSquare, Send, Sparkle, BarChart3, Plus, Trash2,
} from 'lucide-react';

// ============================================================
// COURSE CONTENT — "Thinking in PyTorch"
// ============================================================

const COURSE = {
  title: 'Thinking in PyTorch',
  description: 'Drill the syntax of Python, NumPy, and PyTorch in the context of real ML patterns.',
  totalLessons: 0,
  totalExercises: 0,
  levels: [
    {
      id: 1, title: 'Python for ML',
      lessons: [
        { id: 'l1-1', title: 'Lists & Indexing' },
        { id: 'l1-2', title: 'Slicing' },
        { id: 'l1-3', title: 'List Comprehensions' },
        { id: 'l1-4', title: 'Dicts & Unpacking' },
        { id: 'l1-5', title: 'f-strings & Loops' },
      ],
    },
    {
      id: 2, title: 'NumPy Basics',
      lessons: [
        { id: 'l2-1', title: 'Creating Arrays' },
        { id: 'l2-2', title: 'dtypes & Shape' },
        { id: 'l2-3', title: 'Indexing & Slicing' },
        { id: 'l2-4', title: 'Boolean Masks' },
        { id: 'l2-5', title: 'Level Review', isReview: true },
      ],
    },
    {
      id: 3, title: 'NumPy Operations',
      lessons: [
        { id: 'l3-1', title: 'Elementwise Math' },
        { id: 'l3-2', title: 'The axis Argument' },
        { id: 'l3-3', title: 'Broadcasting' },
        { id: 'l3-4', title: 'Reshaping' },
      ],
    },
    {
      id: 4, title: 'Tensors',
      lessons: [
        { id: 'l4-1', title: 'Creating Tensors' },
        { id: 'l4-2', title: 'Tensor dtypes' },
        { id: 'l4-3', title: 'Devices (CPU/GPU)' },
        { id: 'l4-4', title: 'NumPy Bridge' },
        { id: 'l4-5', title: 'Level Review', isReview: true },
      ],
    },
    {
      id: 5, title: 'Tensor Operations',
      lessons: [
        { id: 'l5-1', title: 'Reshape & View' },
        { id: 'l5-2', title: 'Permute & Transpose' },
        { id: 'l5-3', title: 'Squeeze & Unsqueeze' },
        { id: 'l5-4', title: 'Matrix Multiply' },
        { id: 'l5-5', title: 'Reductions' },
      ],
    },
    {
      id: 6, title: 'Autograd',
      lessons: [
        { id: 'l6-1', title: 'requires_grad' },
        { id: 'l6-2', title: 'backward()' },
        { id: 'l6-3', title: 'Reading .grad' },
        { id: 'l6-4', title: 'no_grad()' },
      ],
    },
    {
      id: 7, title: 'Building Models',
      lessons: [
        { id: 'l7-1', title: 'nn.Module' },
        { id: 'l7-2', title: 'nn.Linear' },
        { id: 'l7-3', title: 'The forward Method' },
        { id: 'l7-4', title: 'Activations' },
        { id: 'l7-5', title: 'Stacking Layers' },
        { id: 'l7-6', title: 'Level Review', isReview: true },
      ],
    },
    {
      id: 8, title: 'Loss & Optimizers',
      lessons: [
        { id: 'l8-1', title: 'Loss Functions' },
        { id: 'l8-2', title: 'Optimizers' },
        { id: 'l8-3', title: 'zero_grad / step' },
        { id: 'l8-4', title: 'Learning Rate' },
      ],
    },
    {
      id: 9, title: 'The Training Loop',
      lessons: [
        { id: 'l9-1', title: 'Forward Pass' },
        { id: 'l9-2', title: 'Compute Loss' },
        { id: 'l9-3', title: 'Backward & Step' },
        { id: 'l9-4', title: 'The Full Loop' },
        { id: 'l9-5', title: 'Tracking Loss' },
        { id: 'l9-6', title: 'Level Review', isReview: true },
      ],
    },
    {
      id: 10, title: 'Data Handling',
      lessons: [
        { id: 'l10-1', title: 'Dataset' },
        { id: 'l10-2', title: 'DataLoader' },
        { id: 'l10-3', title: 'Iterating Batches' },
        { id: 'l10-4', title: 'Transforms' },
      ],
    },
    {
      id: 11, title: 'Inference & Evaluation',
      lessons: [
        { id: 'l11-1', title: 'model.eval()' },
        { id: 'l11-2', title: 'Predictions' },
        { id: 'l11-3', title: 'Accuracy' },
        { id: 'l11-4', title: 'Saving & Loading' },
        { id: 'l11-5', title: 'Level Review', isReview: true },
      ],
    },
    {
      id: 12, title: 'pandas Essentials',
      lessons: [
        { id: 'l12-1', title: 'DataFrames' },
        { id: 'l12-2', title: 'Selecting Columns' },
        { id: 'l12-3', title: 'Filtering Rows' },
        { id: 'l12-4', title: 'To Tensor' },
        { id: 'l12-5', title: 'Final Review', isReview: true },
      ],
    },
  ],
};

const ALL_LESSONS = COURSE.levels.flatMap(lv => lv.lessons.map(l => ({ ...l, level: lv })));
const TOTAL_LESSONS = ALL_LESSONS.length;

// ============================================================
// EXERCISES — multi-step fill-in-the-blank lessons
// ============================================================
// Each lesson has steps. Each step is one of:
//   { type: 'intro', title, body }
//   { type: 'fill', prompt, code: [lines...], options: [...] }
//
// In `code`, write blanks using the placeholder string '___'.
// The options list MUST be in order: each blank pulls the next correct option.
// Wrong distractors come from neighboring concepts.

const EXERCISES = {
  // ========== LEVEL 1: Python for ML ==========
  'l1-1': {
    title: 'Lists & Indexing',
    steps: [
      { type: 'intro', title: 'Lists', body: 'A Python list holds an ordered sequence of values in square brackets. Index from 0 with [i]. Negative indices count from the end: [-1] is the last item.' },
      { type: 'fill', prompt: 'Make a list of three learning rates and read the first one.', code: ['lrs = [0.1, 0.01, 0.001]', 'first = lrs[___]'], options: ['0', '1', '-1', '3'] },
      { type: 'fill', prompt: 'Grab the last element of the list.', code: ['batch_sizes = [16, 32, 64, 128]', 'biggest = batch_sizes[___]'], options: ['-1', '4', '0', 'last'] },
    ],
  },
  'l1-2': {
    title: 'Slicing',
    steps: [
      { type: 'intro', title: 'Slicing', body: 'list[start:stop] returns items from start up to (but not including) stop. Omit start for the beginning, omit stop for the end. list[:n] is the first n items.' },
      { type: 'fill', prompt: 'Take the first 3 samples from the batch.', code: ['batch = [10, 20, 30, 40, 50]', 'head = batch[___:___]'], options: ['', '3', '0', '5', '1', 'len'] },
      { type: 'fill', prompt: 'Take everything from index 2 onward.', code: ['data = [1, 2, 3, 4, 5]', 'tail = data[___:]'], options: ['2', '3', '-2', '0'] },
    ],
  },
  'l1-3': {
    title: 'List Comprehensions',
    steps: [
      { type: 'intro', title: 'Comprehensions', body: 'A list comprehension builds a list in one line: [expr for x in iterable]. You can add a condition: [x for x in items if cond]. This is everywhere in ML data prep.' },
      { type: 'fill', prompt: 'Square each value in the list.', code: ['vals = [1, 2, 3, 4]', 'squares = [x___2 ___ x in vals]'], options: ['**', 'for', '*', 'in', '^', 'while'] },
      { type: 'fill', prompt: 'Keep only the positive numbers.', code: ['xs = [-2, 5, -1, 3]', 'pos = [x for x in xs ___ x > 0]'], options: ['if', 'where', 'when', 'for'] },
    ],
  },
  'l1-4': {
    title: 'Dicts & Unpacking',
    steps: [
      { type: 'intro', title: 'Dicts', body: 'A dict maps keys to values: {key: value}. Read with d[key]. Config and hyperparameters are usually passed around as dicts. ** unpacks a dict into keyword arguments.' },
      { type: 'fill', prompt: 'Read the learning rate from the config dict.', code: ["config = {'lr': 0.01, 'epochs': 10}", "rate = config[___]"], options: ["'lr'", 'lr', '0', "'rate'"] },
      { type: 'fill', prompt: 'Unpack the dict into the function as keyword args.', code: ["params = {'lr': 0.01, 'momentum': 0.9}", 'optim = SGD(model.parameters(), ___params)'], options: ['**', '*', '&', '...'] },
    ],
  },
  'l1-5': {
    title: 'f-strings & Loops',
    steps: [
      { type: 'intro', title: 'f-strings', body: 'An f-string lets you drop variables straight into text: f"loss = {value}". You can format numbers: f"{x:.4f}" shows 4 decimals. Used constantly to log training progress.' },
      { type: 'fill', prompt: 'Print the epoch and loss using an f-string.', code: ['epoch = 3', 'loss = 0.1234', 'print(___"epoch {epoch}: loss {loss}")'], options: ['f', 'format', 's', 'r'] },
      { type: 'fill', prompt: 'Loop over epochs, printing each number.', code: ['___ epoch ___ range(10):', '    print(epoch)'], options: ['for', 'in', 'while', 'of', 'each', 'to'] },
    ],
  },

  // ========== LEVEL 2: NumPy Basics ==========
  'l2-1': {
    title: 'Creating Arrays',
    steps: [
      { type: 'intro', title: 'np.array', body: 'NumPy is imported as np by convention. np.array(list) turns a Python list into an ndarray — the workhorse data structure for numerical computing. np.zeros and np.ones make filled arrays.' },
      { type: 'fill', prompt: 'Import NumPy with its conventional alias.', code: ['import numpy ___ ___'], options: ['as', 'np', 'is', 'numpy', 'import', 'na'] },
      { type: 'fill', prompt: 'Make an array from a Python list.', code: ['import numpy as np', 'arr = np.___([1, 2, 3])'], options: ['array', 'list', 'make', 'tensor'] },
      { type: 'fill', prompt: 'Create a 3×4 array of zeros.', code: ['zeros = np.___((3, 4))'], options: ['zeros', 'zero', 'empty', 'fill'] },
    ],
  },
  'l2-2': {
    title: 'dtypes & Shape',
    steps: [
      { type: 'intro', title: 'shape and dtype', body: 'Every array has a .shape (a tuple of dimensions) and a .dtype (the element type, like float32 or int64). Checking shapes is the single most useful debugging habit in ML.' },
      { type: 'fill', prompt: 'Read the shape of the array.', code: ['arr = np.zeros((8, 16))', 'dims = arr.___'], options: ['shape', 'size', 'dims', 'len'] },
      { type: 'fill', prompt: 'Create an array of float32 values.', code: ['arr = np.array([1, 2, 3], ___=np.float32)'], options: ['dtype', 'type', 'kind', 'as'] },
    ],
  },
  'l2-3': {
    title: 'Indexing & Slicing',
    steps: [
      { type: 'intro', title: '2D indexing', body: 'For a 2D array, index with [row, col]. Use a colon to take a whole axis: arr[0, :] is the first row, arr[:, 0] is the first column. This is how you pull rows and features from a dataset.' },
      { type: 'fill', prompt: 'Select the entire first row.', code: ['X = np.zeros((100, 5))', 'first_row = X[0, ___]'], options: [':', '0', '*', '-1'] },
      { type: 'fill', prompt: 'Select the entire first column (feature 0).', code: ['X = np.zeros((100, 5))', 'feature0 = X[___, 0]'], options: [':', '0', 'all', '*'] },
    ],
  },
  'l2-4': {
    title: 'Boolean Masks',
    steps: [
      { type: 'intro', title: 'Masking', body: 'A comparison on an array gives a boolean array. Use it to filter: arr[arr > 0] returns only the elements where the condition is true. This is how you select samples by label or threshold.' },
      { type: 'fill', prompt: 'Keep only the positive values.', code: ['arr = np.array([-1, 2, -3, 4])', 'pos = arr[arr ___ 0]'], options: ['>', '==', '=', 'is'] },
      { type: 'fill', prompt: 'Select rows where the label equals 1.', code: ['mask = labels ___ 1', 'class1 = X[mask]'], options: ['==', '=', '>', 'is'] },
    ],
  },
  'l2-5': {
    title: 'Level Review',
    steps: [
      { type: 'intro', title: 'NumPy Recap', body: 'np.array builds arrays, .shape and .dtype describe them, [row, col] indexes, and boolean masks filter. These four ideas carry straight over to tensors.' },
      { type: 'fill', prompt: 'Build a float32 array and read its shape.', code: ['arr = np.array([1, 2, 3], dtype=np.___)', 'print(arr.___)'], options: ['float32', 'shape', 'int', 'size'] },
    ],
  },

  // ========== LEVEL 3: NumPy Operations ==========
  'l3-1': {
    title: 'Elementwise Math',
    steps: [
      { type: 'intro', title: 'Vectorized ops', body: 'Arithmetic on arrays happens elementwise — no loops needed. arr + 1 adds 1 to every element; a * b multiplies matching positions. This vectorization is why NumPy is fast.' },
      { type: 'fill', prompt: 'Add 10 to every element.', code: ['arr = np.array([1, 2, 3])', 'shifted = arr ___ 10'], options: ['+', 'add', '.', '++'] },
      { type: 'fill', prompt: 'Multiply two arrays elementwise.', code: ['a = np.array([1, 2, 3])', 'b = np.array([4, 5, 6])', 'prod = a ___ b'], options: ['*', 'x', '.*', 'dot'] },
    ],
  },
  'l3-2': {
    title: 'The axis Argument',
    steps: [
      { type: 'intro', title: 'axis', body: 'Reductions like sum and mean take an axis. axis=0 collapses rows (giving a per-column result); axis=1 collapses columns (per-row). Getting axis right is a constant ML chore.' },
      { type: 'fill', prompt: 'Sum each column (collapse the rows).', code: ['X = np.ones((3, 4))', 'col_sums = X.sum(___=0)'], options: ['axis', 'dim', 'over', 'along'] },
      { type: 'fill', prompt: 'Average across features for each sample (per row).', code: ['X = np.ones((100, 5))', 'row_means = X.mean(axis=___)'], options: ['1', '0', '-1', '5'] },
    ],
  },
  'l3-3': {
    title: 'Broadcasting',
    steps: [
      { type: 'intro', title: 'Broadcasting', body: 'When shapes differ, NumPy "broadcasts" the smaller across the larger if dimensions are compatible. Subtracting a (5,) mean from a (100, 5) matrix normalizes every row — no loop. This is core to data preprocessing.' },
      { type: 'fill', prompt: 'Subtract the per-feature mean from every row.', code: ['X = np.random.randn(100, 5)', 'mean = X.mean(axis=___)', 'centered = X - mean'], options: ['0', '1', '-1', '5'] },
      { type: 'fill', prompt: 'Scale every element by a single number (a scalar broadcasts).', code: ['X = np.ones((3, 3))', 'scaled = X ___ 0.5'], options: ['*', 'scale', 'broadcast', '@'] },
    ],
  },
  'l3-4': {
    title: 'Reshaping',
    steps: [
      { type: 'intro', title: 'reshape', body: 'reshape changes the shape without changing the data. Pass -1 for one dimension to let NumPy infer it. Flattening an image to a vector before a linear layer is a classic use.' },
      { type: 'fill', prompt: 'Reshape a flat array into 3 rows, 4 columns.', code: ['arr = np.arange(12)', 'grid = arr.___(3, 4)'], options: ['reshape', 'view', 'resize', 'shape'] },
      { type: 'fill', prompt: 'Flatten to a single row, letting NumPy infer the length.', code: ['img = np.zeros((28, 28))', 'flat = img.reshape(___)'], options: ['-1', '0', '784', 'flat'] },
    ],
  },

  // ========== LEVEL 4: Tensors ==========
  'l4-1': {
    title: 'Creating Tensors',
    steps: [
      { type: 'intro', title: 'torch.tensor', body: 'PyTorch is imported as torch. torch.tensor(data) makes a tensor — like a NumPy array but able to run on a GPU and track gradients. torch.zeros and torch.randn also make tensors.' },
      { type: 'fill', prompt: 'Import PyTorch.', code: ['___ torch'], options: ['import', 'from', 'include', 'require'] },
      { type: 'fill', prompt: 'Make a tensor from a list.', code: ['import torch', 'x = torch.___([1.0, 2.0, 3.0])'], options: ['tensor', 'array', 'list', 'Tensor'] },
      { type: 'fill', prompt: 'Make a 2×3 tensor of random normal values.', code: ['x = torch.___(2, 3)'], options: ['randn', 'random', 'rand_normal', 'normal'] },
    ],
  },
  'l4-2': {
    title: 'Tensor dtypes',
    steps: [
      { type: 'intro', title: 'Tensor dtypes', body: 'Tensors have dtypes like torch.float32 (the default for math) and torch.long (int64, used for class labels). Models expect float inputs and long targets — a frequent source of errors.' },
      { type: 'fill', prompt: 'Create a float32 tensor (the model-input default).', code: ['x = torch.tensor([1, 2, 3], dtype=torch.___)'], options: ['float32', 'int', 'long', 'double'] },
      { type: 'fill', prompt: 'Make integer class labels (CrossEntropy needs long).', code: ['y = torch.tensor([0, 1, 2], dtype=torch.___)'], options: ['long', 'float32', 'int8', 'bool'] },
    ],
  },
  'l4-3': {
    title: 'Devices (CPU/GPU)',
    steps: [
      { type: 'intro', title: '.to(device)', body: 'Tensors live on a device: CPU or CUDA (GPU). Move with .to(device). The standard idiom picks GPU when available. Both model and data must be on the same device or you get an error.' },
      { type: 'fill', prompt: 'Pick cuda if available, else cpu.', code: ["device = 'cuda' if torch.cuda.___() else 'cpu'"], options: ['is_available', 'available', 'exists', 'has_gpu'] },
      { type: 'fill', prompt: 'Move the tensor to the chosen device.', code: ['x = torch.randn(4, 4)', 'x = x.___(device)'], options: ['to', 'move', 'on', 'cuda'] },
    ],
  },
  'l4-4': {
    title: 'NumPy Bridge',
    steps: [
      { type: 'intro', title: 'NumPy <-> Tensor', body: 'torch.from_numpy(arr) wraps a NumPy array as a tensor; tensor.numpy() converts back. Useful when your data starts in NumPy or pandas and needs to enter a model.' },
      { type: 'fill', prompt: 'Convert a NumPy array into a tensor.', code: ['import numpy as np', 'arr = np.array([1.0, 2.0, 3.0])', 'x = torch.___(arr)'], options: ['from_numpy', 'tensor', 'as_numpy', 'numpy'] },
      { type: 'fill', prompt: 'Convert a tensor back to NumPy.', code: ['x = torch.ones(3)', 'arr = x.___()'], options: ['numpy', 'to_numpy', 'np', 'array'] },
    ],
  },
  'l4-5': {
    title: 'Level Review',
    steps: [
      { type: 'intro', title: 'Tensor Recap', body: 'torch.tensor builds tensors, dtype sets the element type, .to(device) moves them, and from_numpy bridges from NumPy. Same mental model as arrays, plus device and gradients.' },
      { type: 'fill', prompt: 'Build a float tensor and move it to the device.', code: ['x = torch.tensor([1, 2], dtype=torch.___)', 'x = x.___(device)'], options: ['float32', 'to', 'long', 'on'] },
    ],
  },
  // ========== LEVEL 5: Tensor Operations ==========
  'l5-1': {
    title: 'Reshape & View',
    steps: [
      { type: 'intro', title: 'view / reshape', body: 'Tensors reshape with .view(...) or .reshape(...). view needs contiguous memory but is cheap; reshape always works. Pass -1 to infer a dimension. Flattening before a linear layer is the classic case.' },
      { type: 'fill', prompt: 'Flatten a batch of images, keeping the batch dim.', code: ['imgs = torch.randn(64, 1, 28, 28)', 'flat = imgs.view(64, ___)'], options: ['-1', '784', '0', '28'] },
      { type: 'fill', prompt: 'Reshape into 2 rows, inferring the columns.', code: ['x = torch.arange(12)', 'grid = x.reshape(2, ___)'], options: ['-1', '6', '12', '0'] },
    ],
  },
  'l5-2': {
    title: 'Permute & Transpose',
    steps: [
      { type: 'intro', title: 'permute', body: 'permute reorders dimensions by index. Going from NHWC to NCHW image layout, or swapping seq and batch dims, is done with permute. transpose swaps exactly two dims.' },
      { type: 'fill', prompt: 'Reorder (N, H, W, C) to (N, C, H, W).', code: ['x = torch.randn(8, 28, 28, 3)', 'x = x.___(0, 3, 1, 2)'], options: ['permute', 'transpose', 'reorder', 'swap'] },
      { type: 'fill', prompt: 'Swap the last two dimensions of a matrix.', code: ['m = torch.randn(4, 5)', 'mt = m.___(0, 1)'], options: ['transpose', 'permute', 'flip', 't'] },
    ],
  },
  'l5-3': {
    title: 'Squeeze & Unsqueeze',
    steps: [
      { type: 'intro', title: 'squeeze / unsqueeze', body: 'unsqueeze(dim) inserts a size-1 dimension — handy for adding a batch axis. squeeze() removes size-1 dimensions. Shape mismatches are often fixed with one of these.' },
      { type: 'fill', prompt: 'Add a batch dimension at the front.', code: ['x = torch.randn(3, 32, 32)', 'batched = x.___(0)'], options: ['unsqueeze', 'squeeze', 'expand', 'add_dim'] },
      { type: 'fill', prompt: 'Remove all size-1 dimensions.', code: ['x = torch.randn(1, 5, 1)', 'tight = x.___()'], options: ['squeeze', 'unsqueeze', 'flatten', 'trim'] },
    ],
  },
  'l5-4': {
    title: 'Matrix Multiply',
    steps: [
      { type: 'intro', title: 'matmul / @', body: 'Matrix multiplication uses torch.matmul or the @ operator. The inner dimensions must match: (a, b) @ (b, c) gives (a, c). This is the core operation inside every linear layer.' },
      { type: 'fill', prompt: 'Multiply input by a weight matrix with @.', code: ['x = torch.randn(64, 128)', 'W = torch.randn(128, 10)', 'out = x ___ W'], options: ['@', '*', 'x', 'dot'] },
      { type: 'fill', prompt: 'Same multiply using the function form.', code: ['out = torch.___(x, W)'], options: ['matmul', 'multiply', 'mul', 'dot'] },
    ],
  },
  'l5-5': {
    title: 'Reductions',
    steps: [
      { type: 'intro', title: 'sum / mean / argmax', body: 'Reductions collapse a tensor: .sum(), .mean(), .max(). Pass dim= to reduce one axis. argmax(dim=1) returns the index of the largest value per row — exactly how you turn logits into class predictions.' },
      { type: 'fill', prompt: 'Average the loss over the batch.', code: ['per_sample = torch.randn(64)', 'loss = per_sample.___()'], options: ['mean', 'sum', 'avg', 'reduce'] },
      { type: 'fill', prompt: 'Get the predicted class from logits (per row).', code: ['logits = torch.randn(64, 10)', 'preds = logits.___(dim=1)'], options: ['argmax', 'max', 'argmin', 'top'] },
    ],
  },

  // ========== LEVEL 6: Autograd ==========
  'l6-1': {
    title: 'requires_grad',
    steps: [
      { type: 'intro', title: 'requires_grad', body: 'Set requires_grad=True on a tensor and PyTorch records operations on it so it can compute gradients later. Model parameters have this set automatically; you rarely set it by hand except in examples.' },
      { type: 'fill', prompt: 'Create a tensor that tracks gradients.', code: ['w = torch.tensor([2.0], ___=True)'], options: ['requires_grad', 'grad', 'track_grad', 'autograd'] },
      { type: 'fill', prompt: 'Build a simple computation on it.', code: ['w = torch.tensor([2.0], requires_grad=True)', 'y = w ___ 3'], options: ['*', 'grad', '@', 'backward'] },
    ],
  },
  'l6-2': {
    title: 'backward()',
    steps: [
      { type: 'intro', title: '.backward()', body: 'Calling .backward() on a scalar (usually the loss) walks the recorded graph and fills in gradients for every tensor that required them. It must be called on a single number, which is why loss is reduced to a scalar first.' },
      { type: 'fill', prompt: 'Compute gradients from the loss.', code: ['loss = (w * 3).sum()', 'loss.___()'], options: ['backward', 'grad', 'backprop', 'step'] },
      { type: 'fill', prompt: 'Reduce to a scalar before calling backward.', code: ['out = w * 3', 'loss = out.___()', 'loss.backward()'], options: ['sum', 'backward', 'grad', 'item'] },
    ],
  },
  'l6-3': {
    title: 'Reading .grad',
    steps: [
      { type: 'intro', title: '.grad', body: 'After backward(), each tracked tensor holds its gradient in the .grad attribute. Optimizers read these to update parameters. You usually let the optimizer handle it, but reading .grad is great for understanding.' },
      { type: 'fill', prompt: 'Read the gradient that backward computed.', code: ['loss.backward()', 'g = w.___'], options: ['grad', 'gradient', 'backward', 'diff'] },
    ],
  },
  'l6-4': {
    title: 'no_grad()',
    steps: [
      { type: 'intro', title: 'torch.no_grad()', body: 'Wrap code in with torch.no_grad(): to turn off gradient tracking — faster and uses less memory. Always used during inference and evaluation, where you do not need gradients.' },
      { type: 'fill', prompt: 'Disable gradient tracking for inference.', code: ['with torch.___():', '    preds = model(x)'], options: ['no_grad', 'eval', 'inference', 'stop_grad'] },
    ],
  },

  // ========== LEVEL 7: Building Models ==========
  'l7-1': {
    title: 'nn.Module',
    steps: [
      { type: 'intro', title: 'nn.Module', body: 'Models subclass torch.nn.Module. In __init__ you call super().__init__() and define layers; in forward you describe the computation. nn is imported as import torch.nn as nn.' },
      { type: 'fill', prompt: 'Subclass nn.Module to define a model.', code: ['import torch.nn as nn', '', 'class Net(nn.___):', '    def __init__(self):', '        super().__init__()'], options: ['Module', 'Model', 'Net', 'Layer'] },
      { type: 'fill', prompt: 'Call the parent constructor.', code: ['class Net(nn.Module):', '    def __init__(self):', '        ___().__init__()'], options: ['super', 'self', 'parent', 'nn'] },
    ],
  },
  'l7-2': {
    title: 'nn.Linear',
    steps: [
      { type: 'intro', title: 'nn.Linear', body: 'nn.Linear(in_features, out_features) is a fully-connected layer: it does x @ W.T + b. The first argument is the input size, the second is the output size. Wiring these sizes together correctly is most of model building.' },
      { type: 'fill', prompt: 'Define a layer from 784 inputs to 128 outputs.', code: ['self.fc1 = nn.___(784, 128)'], options: ['Linear', 'Dense', 'FC', 'Layer'] },
      { type: 'fill', prompt: 'Add the output layer to 10 classes.', code: ['self.fc1 = nn.Linear(784, 128)', 'self.fc2 = nn.Linear(___, 10)'], options: ['128', '784', '10', '64'] },
    ],
  },
  'l7-3': {
    title: 'The forward Method',
    steps: [
      { type: 'intro', title: 'forward', body: 'forward(self, x) defines how input flows through the layers and returns the output. You call the model like model(x) — never model.forward(x) directly — and PyTorch routes it to forward.' },
      { type: 'fill', prompt: 'Pass input through the first layer in forward.', code: ['def ___(self, x):', '    x = self.fc1(x)', '    return x'], options: ['forward', 'call', 'predict', 'run'] },
      { type: 'fill', prompt: 'Run the model on a batch (calls forward).', code: ['model = Net()', 'out = ___(x)'], options: ['model', 'model.forward', 'Net', 'forward'] },
    ],
  },
  'l7-4': {
    title: 'Activations',
    steps: [
      { type: 'intro', title: 'ReLU', body: 'Activation functions add nonlinearity between layers. torch.relu(x) zeroes out negatives and is the common default. Without a nonlinearity, stacked linear layers collapse into one.' },
      { type: 'fill', prompt: 'Apply ReLU after the first layer.', code: ['x = self.fc1(x)', 'x = torch.___(x)', 'x = self.fc2(x)'], options: ['relu', 'sigmoid', 'linear', 'activate'] },
    ],
  },
  'l7-5': {
    title: 'Stacking Layers',
    steps: [
      { type: 'intro', title: 'nn.Sequential', body: 'nn.Sequential chains layers so the output of one feeds the next, without writing a forward method. Great for simple feed-forward stacks.' },
      { type: 'fill', prompt: 'Stack Linear -> ReLU -> Linear in order.', code: ['model = nn.___(', '    nn.Linear(784, 128),', '    nn.ReLU(),', '    nn.Linear(128, 10),', ')'], options: ['Sequential', 'Stack', 'Chain', 'Module'] },
    ],
  },
  'l7-6': {
    title: 'Level Review',
    steps: [
      { type: 'intro', title: 'Model Recap', body: 'Subclass nn.Module, define nn.Linear layers in __init__, chain them with activations in forward, and call the model like a function. That is a complete model.' },
      { type: 'fill', prompt: 'Define a layer and apply a nonlinearity.', code: ['self.fc = nn.___(64, 32)', '# in forward:', 'x = torch.___(self.fc(x))'], options: ['Linear', 'relu', 'Dense', 'sigmoid'] },
    ],
  },

  // ========== LEVEL 8: Loss & Optimizers ==========
  'l8-1': {
    title: 'Loss Functions',
    steps: [
      { type: 'intro', title: 'Loss', body: 'A loss measures how wrong predictions are. nn.CrossEntropyLoss is standard for classification (it takes raw logits and integer labels). nn.MSELoss is standard for regression. You create the loss once, then call it each step.' },
      { type: 'fill', prompt: 'Create a cross-entropy loss for classification.', code: ['criterion = nn.___()'], options: ['CrossEntropyLoss', 'MSELoss', 'NLLLoss', 'Loss'] },
      { type: 'fill', prompt: 'Compute loss from logits and integer targets.', code: ['loss = criterion(___, ___)'], options: ['logits', 'targets', 'loss', 'model', 'preds', 'grad'] },
    ],
  },
  'l8-2': {
    title: 'Optimizers',
    steps: [
      { type: 'intro', title: 'torch.optim', body: 'An optimizer updates parameters using their gradients. optim.Adam and optim.SGD are the common choices. You pass model.parameters() and a learning rate lr.' },
      { type: 'fill', prompt: 'Create an Adam optimizer over the model parameters.', code: ['optimizer = torch.optim.___(model.parameters(), lr=0.001)'], options: ['Adam', 'SGD', 'Optimizer', 'Adagrad'] },
      { type: 'fill', prompt: 'Pass the model parameters into the optimizer.', code: ['optimizer = torch.optim.SGD(model.___(), lr=0.01)'], options: ['parameters', 'params', 'weights', 'grads'] },
    ],
  },
  'l8-3': {
    title: 'zero_grad / step',
    steps: [
      { type: 'intro', title: 'The update ritual', body: 'Gradients accumulate by default, so each step you must: zero_grad() to clear old gradients, backward() to compute new ones, then step() to apply the update. Forgetting zero_grad is a classic bug — gradients pile up.' },
      { type: 'fill', prompt: 'Clear gradients before the backward pass.', code: ['optimizer.___()', 'loss.backward()', 'optimizer.step()'], options: ['zero_grad', 'reset', 'clear', 'no_grad'] },
      { type: 'fill', prompt: 'Apply the parameter update after backward.', code: ['optimizer.zero_grad()', 'loss.backward()', 'optimizer.___()'], options: ['step', 'update', 'apply', 'backward'] },
    ],
  },
  'l8-4': {
    title: 'Learning Rate',
    steps: [
      { type: 'intro', title: 'lr', body: 'The learning rate lr scales each update. Too high and training diverges; too low and it crawls. It is the single most important hyperparameter, passed when you build the optimizer.' },
      { type: 'fill', prompt: 'Set a learning rate of 0.001 on Adam.', code: ['optimizer = torch.optim.Adam(model.parameters(), ___=0.001)'], options: ['lr', 'rate', 'step_size', 'alpha'] },
    ],
  },
  // ========== LEVEL 9: The Training Loop ==========
  'l9-1': {
    title: 'Forward Pass',
    steps: [
      { type: 'intro', title: 'Forward pass', body: 'The training loop starts by running a batch of inputs through the model to get predictions (logits). This is the forward pass — just calling the model on the data.' },
      { type: 'fill', prompt: 'Run the batch through the model.', code: ['for xb, yb in loader:', '    logits = ___(xb)'], options: ['model', 'forward', 'net', 'run'] },
    ],
  },
  'l9-2': {
    title: 'Compute Loss',
    steps: [
      { type: 'intro', title: 'Compute loss', body: 'Next, compare predictions to the true labels with the loss function. The result is a scalar tensor measuring this batch\'s error.' },
      { type: 'fill', prompt: 'Compute the loss for this batch.', code: ['logits = model(xb)', 'loss = criterion(logits, ___)'], options: ['yb', 'xb', 'logits', 'loss'] },
    ],
  },
  'l9-3': {
    title: 'Backward & Step',
    steps: [
      { type: 'intro', title: 'Backward & step', body: 'With a loss in hand, run the three-line update: zero the gradients, backpropagate, and step the optimizer. This is the heart of learning.' },
      { type: 'fill', prompt: 'Fill in the three-line update in order.', code: ['optimizer.___()', 'loss.___()', 'optimizer.___()'], options: ['zero_grad', 'backward', 'step', 'reset', 'grad', 'update'] },
    ],
  },
  'l9-4': {
    title: 'The Full Loop',
    steps: [
      { type: 'intro', title: 'The full loop', body: 'Put it together: loop over epochs, loop over batches, then forward, loss, zero_grad, backward, step. Memorizing this skeleton is the single most useful thing in this whole app.' },
      { type: 'fill', prompt: 'Complete the canonical training loop.', code: ['for epoch in range(epochs):', '    for xb, yb in loader:', '        logits = model(xb)', '        loss = criterion(logits, yb)', '        optimizer.___()', '        loss.___()', '        optimizer.___()'], options: ['zero_grad', 'backward', 'step', 'reset', 'grad', 'eval'] },
    ],
  },
  'l9-5': {
    title: 'Tracking Loss',
    steps: [
      { type: 'intro', title: '.item()', body: 'loss is a tensor; .item() pulls out the plain Python number so you can log or accumulate it without holding onto the computation graph. Use it whenever you store a loss value.' },
      { type: 'fill', prompt: 'Accumulate the batch loss as a plain number.', code: ['total += loss.___()'], options: ['item', 'value', 'numpy', 'float'] },
      { type: 'fill', prompt: 'Log the epoch loss with an f-string.', code: ['print(___"epoch {epoch}: {total:.4f}")'], options: ['f', 'format', 's', 'r'] },
    ],
  },
  'l9-6': {
    title: 'Level Review',
    steps: [
      { type: 'intro', title: 'Training Loop Recap', body: 'forward -> loss -> zero_grad -> backward -> step, wrapped in epoch and batch loops, with .item() for logging. This loop, internalized, is what the whole course was building toward.' },
      { type: 'fill', prompt: 'Reconstruct the update and log line.', code: ['loss = criterion(model(xb), yb)', 'optimizer.zero_grad()', 'loss.___()', 'optimizer.___()', 'running += loss.___()'], options: ['backward', 'step', 'item', 'grad', 'zero_grad', 'mean'] },
    ],
  },

  // ========== LEVEL 10: Data Handling ==========
  'l10-1': {
    title: 'Dataset',
    steps: [
      { type: 'intro', title: 'Dataset', body: 'A custom Dataset subclasses torch.utils.data.Dataset and implements __len__ (how many samples) and __getitem__ (return one sample by index). This is how PyTorch accesses your data one item at a time.' },
      { type: 'fill', prompt: 'Return the number of samples.', code: ['class MyData(Dataset):', '    def ___(self):', '        return len(self.X)'], options: ['__len__', '__getitem__', '__init__', 'length'] },
      { type: 'fill', prompt: 'Return one sample by index.', code: ['    def ___(self, idx):', '        return self.X[idx], self.y[idx]'], options: ['__getitem__', '__len__', '__call__', 'get'] },
    ],
  },
  'l10-2': {
    title: 'DataLoader',
    steps: [
      { type: 'intro', title: 'DataLoader', body: 'A DataLoader wraps a Dataset and hands out batches. Set batch_size and shuffle=True for training (so the model does not see the same order every epoch).' },
      { type: 'fill', prompt: 'Make a training loader with batches of 32, shuffled.', code: ['loader = DataLoader(dataset, ___=32, ___=True)'], options: ['batch_size', 'shuffle', 'batch', 'random', 'size', 'mix'] },
    ],
  },
  'l10-3': {
    title: 'Iterating Batches',
    steps: [
      { type: 'intro', title: 'Iterating', body: 'Looping over a DataLoader yields (inputs, targets) tuples, one batch per iteration. This is the inner loop of training. Each xb has shape (batch_size, ...features).' },
      { type: 'fill', prompt: 'Unpack each batch into inputs and targets.', code: ['for ___, ___ in loader:', '    logits = model(xb)'], options: ['xb', 'yb', 'x', 'y', 'data', 'label'] },
    ],
  },
  'l10-4': {
    title: 'Transforms',
    steps: [
      { type: 'intro', title: 'Transforms', body: 'Transforms preprocess each sample — e.g. converting an image to a tensor and normalizing it. transforms.ToTensor() and transforms.Normalize(mean, std) are the staples, often chained with transforms.Compose.' },
      { type: 'fill', prompt: 'Chain two transforms together.', code: ['tf = transforms.___([', '    transforms.ToTensor(),', '    transforms.Normalize((0.5,), (0.5,)),', '])'], options: ['Compose', 'Chain', 'Sequential', 'Stack'] },
      { type: 'fill', prompt: 'Convert a PIL image to a tensor.', code: ['tf = transforms.___()'], options: ['ToTensor', 'AsTensor', 'ToArray', 'Tensor'] },
    ],
  },

  // ========== LEVEL 11: Inference & Evaluation ==========
  'l11-1': {
    title: 'model.eval()',
    steps: [
      { type: 'intro', title: 'eval mode', body: 'Call model.eval() before evaluating to switch layers like dropout and batchnorm into inference behavior. Pair it with torch.no_grad(). Switch back with model.train() before training again.' },
      { type: 'fill', prompt: 'Put the model in evaluation mode.', code: ['model.___()'], options: ['eval', 'evaluate', 'test', 'no_grad'] },
      { type: 'fill', prompt: 'Switch back to training mode afterward.', code: ['model.___()'], options: ['train', 'fit', 'eval', 'learn'] },
    ],
  },
  'l11-2': {
    title: 'Predictions',
    steps: [
      { type: 'intro', title: 'logits -> class', body: 'A classifier outputs logits of shape (batch, num_classes). The predicted class is the index of the largest logit per row: argmax(dim=1). Wrap inference in no_grad for speed.' },
      { type: 'fill', prompt: 'Get class predictions inside no_grad.', code: ['with torch.no_grad():', '    logits = model(xb)', '    preds = logits.___(dim=1)'], options: ['argmax', 'max', 'softmax', 'argmin'] },
    ],
  },
  'l11-3': {
    title: 'Accuracy',
    steps: [
      { type: 'intro', title: 'Accuracy', body: 'Accuracy is the fraction of correct predictions. Compare preds to labels with ==, which gives a boolean tensor; take the float mean to get the fraction correct.' },
      { type: 'fill', prompt: 'Compute the fraction of correct predictions.', code: ['correct = (preds ___ yb)', 'acc = correct.___().mean()'], options: ['==', 'float', '=', 'sum', 'is', 'int'] },
    ],
  },
  'l11-4': {
    title: 'Saving & Loading',
    steps: [
      { type: 'intro', title: 'state_dict', body: 'Save a model\'s learned weights with torch.save(model.state_dict(), path). Load them back with model.load_state_dict(torch.load(path)). Saving the state_dict (not the whole model) is the recommended approach.' },
      { type: 'fill', prompt: 'Save the model weights to disk.', code: ["torch.save(model.___(), 'model.pt')"], options: ['state_dict', 'parameters', 'weights', 'save'] },
      { type: 'fill', prompt: 'Load saved weights back into the model.', code: ["model.___(torch.load('model.pt'))"], options: ['load_state_dict', 'load', 'set_weights', 'restore'] },
    ],
  },
  'l11-5': {
    title: 'Level Review',
    steps: [
      { type: 'intro', title: 'Inference Recap', body: 'eval() + no_grad() for evaluation, argmax(dim=1) for predictions, == and float mean for accuracy, and state_dict for save/load. That is a complete evaluation workflow.' },
      { type: 'fill', prompt: 'Evaluate: set mode, predict, score.', code: ['model.___()', 'with torch.no_grad():', '    preds = model(xb).___(dim=1)', 'acc = (preds == yb).float().___()'], options: ['eval', 'argmax', 'mean', 'train', 'max', 'sum'] },
    ],
  },

  // ========== LEVEL 12: pandas Essentials ==========
  'l12-1': {
    title: 'DataFrames',
    steps: [
      { type: 'intro', title: 'pandas', body: 'pandas is imported as pd. A DataFrame is a labeled table — like a spreadsheet in memory. pd.read_csv(path) loads data from a file into a DataFrame, the usual first step of a data pipeline.' },
      { type: 'fill', prompt: 'Import pandas with its conventional alias.', code: ['import pandas ___ ___'], options: ['as', 'pd', 'is', 'pandas', 'import', 'pa'] },
      { type: 'fill', prompt: 'Load a CSV file into a DataFrame.', code: ["df = pd.___('data.csv')"], options: ['read_csv', 'load_csv', 'read', 'csv'] },
    ],
  },
  'l12-2': {
    title: 'Selecting Columns',
    steps: [
      { type: 'intro', title: 'Column selection', body: 'Select one column with df["name"] (a Series) or several with df[["a", "b"]] (a DataFrame). Splitting features from the target column is a constant first step before training.' },
      { type: 'fill', prompt: 'Select the target column.', code: ["y = df[___]"], options: ["'label'", 'label', '0', "'y'"] },
      { type: 'fill', prompt: 'Select multiple feature columns.', code: ["X = df[[___, ___]]"], options: ["'age'", "'income'", 'age', 'income', '0', '1'] },
    ],
  },
  'l12-3': {
    title: 'Filtering Rows',
    steps: [
      { type: 'intro', title: 'Boolean filtering', body: 'Filter rows with a boolean condition, just like NumPy masks: df[df["age"] > 18]. This is how you slice a dataset down to the rows you want.' },
      { type: 'fill', prompt: 'Keep only rows where age is over 18.', code: ["adults = df[df['age'] ___ 18]"], options: ['>', '==', '=', 'is'] },
    ],
  },
  'l12-4': {
    title: 'To Tensor',
    steps: [
      { type: 'intro', title: 'DataFrame -> tensor', body: 'To feed pandas data into a model, take .values (a NumPy array) and wrap it with torch.tensor, usually as float32 for features. This bridges the data pipeline into PyTorch.' },
      { type: 'fill', prompt: 'Convert the feature columns to a float tensor.', code: ['X = torch.tensor(df[cols].___, dtype=torch.___)'], options: ['values', 'float32', 'data', 'long', 'numpy', 'int'] },
    ],
  },
  'l12-5': {
    title: 'Final Review',
    steps: [
      { type: 'intro', title: 'You made it.', body: 'You\'ve drilled Python, NumPy, tensors, autograd, models, losses, optimizers, the training loop, data loading, evaluation, and pandas — the full syntax surface of a PyTorch workflow. Tap Continue to wrap up.' },
      { type: 'fill', prompt: 'One last time: load data and make it a tensor.', code: ["df = pd.___('data.csv')", 'X = torch.tensor(df[cols].values, dtype=torch.___)'], options: ['read_csv', 'float32', 'read', 'long'] },
    ],
  },
};

// Lessons without explicit exercises get a generic placeholder step
const PLACEHOLDER_LESSON = (title) => ({
  title,
  steps: [
    {
      type: 'intro',
      title: title,
      body: `This lesson on ${title} is part of the full course. Tap "Continue" to mark it complete and move on.`,
    },
  ],
});

// ============================================================
// TUTOR — local knowledge base
// ============================================================
// Two layers:
//   1. Per-lesson FAQs (high quality, hand-written, lesson-specific)
//   2. Global concept glossary (covers core C terms, available everywhere)
// Matching uses simple keyword overlap with a confidence threshold.
// Below threshold → falls back to API.

// Each entry: { keywords: [...], question: '...', answer: '...', topics?: [...] }

const GLOSSARY = [
  {
    keywords: ['tensor', 'what is a tensor', 'torch.tensor'],
    question: 'What is a tensor?',
    answer: 'A tensor is PyTorch\'s core data structure — an n-dimensional array, like a NumPy array but able to run on a GPU and track gradients for training. A scalar is a 0-D tensor, a vector is 1-D, a matrix is 2-D, and so on. Make one with torch.tensor([1.0, 2.0]).',
  },
  {
    keywords: ['shape', 'dimensions', 'size', 'dims'],
    question: 'How do I check a tensor\'s shape?',
    answer: 'Use .shape — it returns the size of each dimension. A tensor of shape (64, 3, 28, 28) is a batch of 64 images, 3 channels, 28x28 pixels. Checking shapes constantly is the single best debugging habit; most errors are shape mismatches.',
  },
  {
    keywords: ['dtype', 'float32', 'long', 'int64', 'type'],
    question: 'What dtypes do I need to know?',
    answer: 'torch.float32 is the default for model inputs and weights. torch.long (int64) is required for class labels in CrossEntropyLoss. A common error is passing float labels or int inputs — match the dtype to what the op expects.',
  },
  {
    keywords: ['requires_grad', 'gradient tracking', 'autograd'],
    question: 'What does requires_grad do?',
    answer: 'Setting requires_grad=True tells PyTorch to record operations on a tensor so it can compute gradients during backward(). Model parameters have it on automatically. Inputs and data usually do not need it.',
  },
  {
    keywords: ['backward', 'backprop', 'gradients'],
    question: 'What does loss.backward() do?',
    answer: 'It walks backward through the recorded computation graph and computes the gradient of the loss with respect to every tensor that has requires_grad=True, storing each in that tensor\'s .grad. It must be called on a scalar, which is why loss is reduced to a single number first.',
  },
  {
    keywords: ['zero_grad', 'why zero', 'accumulate'],
    question: 'Why do I need optimizer.zero_grad()?',
    answer: 'Gradients accumulate (add up) by default each time you call backward(). If you do not clear them first with zero_grad(), this batch\'s gradients pile on top of the last batch\'s, corrupting the update. The ritual each step is: zero_grad, backward, step.',
  },
  {
    keywords: ['step', 'optimizer.step', 'update'],
    question: 'What does optimizer.step() do?',
    answer: 'It applies one update to the model parameters using the gradients currently stored in .grad. You call it after loss.backward() has filled in those gradients. Conceptually: param = param - lr * grad (for plain SGD).',
  },
  {
    keywords: ['no_grad', 'inference', 'eval mode'],
    question: 'When do I use torch.no_grad()?',
    answer: 'Wrap evaluation or inference code in with torch.no_grad(): to stop PyTorch from tracking gradients. It is faster and uses less memory, and you do not need gradients when you are only making predictions, not training.',
  },
  {
    keywords: ['nn.module', 'module', 'model class'],
    question: 'What is nn.Module?',
    answer: 'It is the base class for all models. You subclass it, call super().__init__() and define your layers in __init__, then describe the data flow in forward(). PyTorch then tracks your parameters and lets you call the model like a function.',
  },
  {
    keywords: ['nn.linear', 'linear', 'fully connected', 'dense'],
    question: 'What does nn.Linear do?',
    answer: 'nn.Linear(in_features, out_features) is a fully-connected layer computing x @ W.T + b. The first number is how many inputs come in, the second is how many outputs go out. The out_features of one layer must equal the in_features of the next.',
  },
  {
    keywords: ['forward', 'forward method', 'call model'],
    question: 'Why do I call model(x) instead of model.forward(x)?',
    answer: 'Calling model(x) runs PyTorch\'s __call__, which does setup (like registering hooks and handling train/eval mode) and then calls your forward. Calling forward directly skips that machinery, so always use model(x).',
  },
  {
    keywords: ['relu', 'activation', 'nonlinearity'],
    question: 'Why do I need activation functions?',
    answer: 'Activations like torch.relu add nonlinearity between layers. Without them, stacking linear layers is mathematically equivalent to a single linear layer, so the network could not learn complex patterns. ReLU (max(0, x)) is the common default.',
  },
  {
    keywords: ['crossentropy', 'cross entropy', 'loss function', 'classification'],
    question: 'How does CrossEntropyLoss work?',
    answer: 'nn.CrossEntropyLoss is the standard classification loss. It takes raw logits (not softmaxed) of shape (batch, num_classes) and integer class labels of shape (batch,) with dtype long. It applies softmax internally — do not add a softmax layer before it.',
  },
  {
    keywords: ['optimizer', 'adam', 'sgd', 'optim'],
    question: 'What is an optimizer?',
    answer: 'An optimizer updates model parameters from their gradients. torch.optim.Adam is a robust default; torch.optim.SGD is the classic. You build it with model.parameters() and a learning rate, e.g. Adam(model.parameters(), lr=0.001).',
  },
  {
    keywords: ['learning rate', 'lr', 'hyperparameter'],
    question: 'What is the learning rate?',
    answer: 'The learning rate (lr) scales how big each parameter update is. Too high and training diverges or oscillates; too low and it learns painfully slowly. It is the most important hyperparameter to tune. Common starting points: 1e-3 for Adam, 1e-2 for SGD.',
  },
  {
    keywords: ['training loop', 'loop', 'train'],
    question: 'What is the standard training loop?',
    answer: 'For each epoch, for each batch: (1) logits = model(xb), (2) loss = criterion(logits, yb), (3) optimizer.zero_grad(), (4) loss.backward(), (5) optimizer.step(). Memorizing this five-step skeleton is the most useful thing you can do.',
  },
  {
    keywords: ['dataset', 'getitem', 'len'],
    question: 'What is a Dataset?',
    answer: 'A Dataset subclass tells PyTorch how to access your data. You implement __len__ (number of samples) and __getitem__(idx) (return one sample, usually an (input, label) tuple). A DataLoader then wraps it to produce batches.',
  },
  {
    keywords: ['dataloader', 'batch', 'batch_size', 'shuffle'],
    question: 'What does DataLoader do?',
    answer: 'A DataLoader wraps a Dataset and yields batches. Set batch_size to control how many samples per batch and shuffle=True for training so the model does not memorize the order. Looping over it gives (inputs, targets) tuples.',
  },
  {
    keywords: ['eval', 'model.eval', 'train mode'],
    question: 'What does model.eval() do?',
    answer: 'It switches layers that behave differently during training vs inference — dropout and batchnorm — into evaluation mode. Call model.eval() before validating or testing, and model.train() before training again. Pair eval() with torch.no_grad().',
  },
  {
    keywords: ['state_dict', 'save', 'load', 'checkpoint'],
    question: 'How do I save and load a model?',
    answer: 'Save the weights with torch.save(model.state_dict(), "model.pt") and load them with model.load_state_dict(torch.load("model.pt")). Saving the state_dict (just the learned tensors) is preferred over saving the whole model object.',
  },
  {
    keywords: ['broadcasting', 'broadcast', 'shapes'],
    question: 'What is broadcasting?',
    answer: 'Broadcasting lets operations work on tensors of different shapes by virtually stretching the smaller one. Subtracting a (5,) per-feature mean from a (100, 5) batch works because the mean is broadcast across all 100 rows. Dimensions must be equal or one of them 1.',
  },
  {
    keywords: ['axis', 'dim', 'reduction'],
    question: 'What does the dim/axis argument mean?',
    answer: 'It picks which dimension a reduction collapses. dim=0 collapses rows (giving a per-column result); dim=1 collapses columns (per-row). For logits of shape (batch, classes), argmax(dim=1) gives one predicted class per sample.',
  },
  {
    keywords: ['reshape', 'view', 'flatten'],
    question: 'What is the difference between view and reshape?',
    answer: 'Both change a tensor\'s shape without changing its data. view requires the memory to be contiguous and is essentially free; reshape works always (copying if needed). Pass -1 for one dimension to have it inferred, e.g. x.view(batch, -1) to flatten.',
  },
  {
    keywords: ['matmul', '@', 'matrix multiply', 'dot'],
    question: 'How do I multiply matrices?',
    answer: 'Use the @ operator or torch.matmul. The inner dimensions must match: (a, b) @ (b, c) gives (a, c). This is the operation at the heart of every linear layer.',
  },
  {
    keywords: ['squeeze', 'unsqueeze', 'add dimension'],
    question: 'What do squeeze and unsqueeze do?',
    answer: 'unsqueeze(dim) inserts a size-1 dimension — often used to add a batch axis, e.g. x.unsqueeze(0). squeeze() removes size-1 dimensions. Both are common fixes for shape mismatches.',
  },
  {
    keywords: ['item', '.item', 'python number'],
    question: 'What does .item() do?',
    answer: 'It extracts a plain Python number from a single-element tensor. Use it when logging or accumulating a loss — total += loss.item() — so you do not accidentally keep the whole computation graph alive in memory.',
  },
  {
    keywords: ['numpy', 'from_numpy', 'bridge', 'convert'],
    question: 'How do I convert between NumPy and tensors?',
    answer: 'torch.from_numpy(arr) makes a tensor from a NumPy array; tensor.numpy() goes back the other way. They share memory when on CPU, so changing one can change the other. Useful when data starts in NumPy or pandas.',
  },
  {
    keywords: ['device', 'cuda', 'gpu', 'cpu', 'to'],
    question: 'How do I move tensors to the GPU?',
    answer: 'Pick a device with device = "cuda" if torch.cuda.is_available() else "cpu", then call .to(device) on both your model and your data. A frequent error is having the model on GPU and the batch on CPU — they must match.',
  },
];

const LESSON_FAQS = {
  'l4-2': [
    { keywords: ['why long', 'labels', 'crossentropy dtype'], question: 'Why do labels need to be long?', answer: 'CrossEntropyLoss treats each label as a class index, and indices must be integers — specifically int64 (torch.long). Passing float labels raises an error. Inputs stay float32; only the integer targets are long.' },
  ],
  'l5-4': [
    { keywords: ['inner dimension', 'shape mismatch', 'matmul error'], question: 'Why does my matmul throw a shape error?', answer: 'The inner dimensions must match: to multiply (a, b) @ (c, d), you need b == c. If you get a mismatch, print both .shape values — usually one tensor needs a transpose or you have the operands in the wrong order.' },
  ],
  'l8-3': [
    { keywords: ['order', 'sequence', 'which first'], question: 'What order do zero_grad, backward, and step go in?', answer: 'zero_grad() first (clear old gradients), then loss.backward() (compute new ones), then optimizer.step() (apply the update). A common bug is calling them out of order or forgetting zero_grad, which makes gradients accumulate across batches.' },
  ],
  'l9-4': [
    { keywords: ['forget', 'common mistakes', 'loop bugs'], question: 'What are the most common training-loop bugs?', answer: 'Forgetting optimizer.zero_grad() (gradients accumulate), leaving the model in eval mode during training, putting model and data on different devices, and using the wrong label dtype. If loss is not going down, check these first.' },
  ],
  'l11-1': [
    { keywords: ['why eval', 'dropout', 'batchnorm'], question: 'What actually changes when I call model.eval()?', answer: 'Dropout stops dropping units (uses all of them), and batchnorm uses its running statistics instead of batch statistics. If you forget eval() at test time, predictions become noisy and inconsistent. Remember to call model.train() again before resuming training.' },
  ],
};

// Suggestion chips shown above the input — generic + lesson-specific
const GLOBAL_SUGGESTIONS = [
  'Explain this concept',
  'Why is my answer wrong?',
  'Show me an example',
  "What's a real-world use?",
];

// Score how well a question matches an entry — count keyword hits weighted by length
function scoreEntryMatch(question, entry) {
  const q = question.toLowerCase();
  let score = 0;
  for (const kw of entry.keywords) {
    const k = kw.toLowerCase();
    if (q.includes(k)) {
      // Longer/more specific keywords matter more
      score += Math.max(1, k.length / 3);
    }
  }
  return score;
}

// Find the best local match. Returns { entry, score } or null.
// Threshold is calibrated so common short questions match if they share keywords.
function findLocalMatch(question, lessonId) {
  if (!question || question.trim().length < 3) return null;
  const candidates = [
    ...(LESSON_FAQS[lessonId] || []),
    ...GLOSSARY,
  ];
  let best = null;
  for (const e of candidates) {
    const s = scoreEntryMatch(question, e);
    if (!best || s > best.score) best = { entry: e, score: s };
  }
  // Threshold: must score at least 3 to be considered a confident match
  if (best && best.score >= 3) return best;
  return null;
}

// ============================================================
// HOOKED PRINCIPLES — supporting data
// ============================================================

// Internal-trigger options shown during onboarding (5 Whys → emotional pain)
const MOTIVATIONS = [
  { id: 'career', label: 'Job or career change', sub: 'Build skills for a role I want.', tagline: 'One step closer to that role.' },
  { id: 'school', label: 'School or coursework', sub: 'Get ahead in CS classes.', tagline: "Class won't know what hit them." },
  { id: 'curiosity', label: 'Just curious', sub: 'Want to understand how things work.', tagline: 'Another mystery solved.' },
  { id: 'fun', label: 'Fun side project', sub: 'Building something for myself.', tagline: 'Nice. Keep playing.' },
];

// Variable celebration messages (Self-reward)
const CELEBRATIONS = [
  'Nice work.', 'Locked in.', 'Crushing it.', 'Smooth.', "That's the way.",
  'Loss going down.', 'Clean run.', 'No shape errors today.', 'Sharp.',
  'Tidy.', 'Beautiful.', "You're cooking.", 'Solid.', 'Gradients flowing.',
];

// Random loot rewards on milestone lessons
const LOOT_REWARDS = [
  { type: 'xp', label: 'Bonus XP', amount: 25, icon: '⚡' },
  { type: 'xp', label: 'Mega XP', amount: 50, icon: '✨' },
  { type: 'shield', label: 'Streak Shield', amount: 1, icon: '🛡️' },
  { type: 'multiplier', label: '2× XP Tomorrow', amount: 1, icon: '🔥' },
  { type: 'xp', label: 'Lucky XP', amount: 15, icon: '🍀' },
];

const BADGE_DEFS = [
  { id: 'first-step', name: 'First Step', desc: 'Complete your first lesson', icon: '🌱', check: (p) => Object.keys(p.completed).length >= 1 },
  { id: 'streak-3', name: 'On a Roll', desc: '3-day streak', icon: '🔥', check: (p) => p.streak >= 3 },
  { id: 'streak-7', name: 'Week Warrior', desc: '7-day streak', icon: '🔥', check: (p) => p.streak >= 7 },
  { id: 'streak-30', name: 'Unstoppable', desc: '30-day streak', icon: '🔥', check: (p) => p.streak >= 30 },
  { id: 'level-1', name: 'Pythonista', desc: 'Finish Python for ML', icon: '🐍', check: (p) => COURSE.levels[0].lessons.every(l => p.completed[l.id]) },
  { id: 'tensor-pro', name: 'Tensor Wrangler', desc: 'Finish Tensors', icon: '🔢', check: (p) => COURSE.levels[3].lessons.every(l => p.completed[l.id]) },
  { id: 'loop-master', name: 'Loop Master', desc: 'Finish The Training Loop', icon: '🔁', check: (p) => COURSE.levels[8].lessons.every(l => p.completed[l.id]) },
  { id: 'half-way', name: 'Halfway There', desc: 'Complete half the course', icon: '⛰️', check: (p) => Object.keys(p.completed).length >= TOTAL_LESSONS / 2 },
  { id: 'graduate', name: 'PyTorch Graduate', desc: 'Complete every lesson', icon: '🎓', check: (p) => Object.keys(p.completed).length >= TOTAL_LESSONS },
  { id: 'hundred-xp', name: 'Century', desc: 'Earn 100 XP', icon: '💯', check: (p) => p.totalXP >= 100 },
  { id: 'thousand-xp', name: 'Quadruple Digits', desc: 'Earn 1000 XP', icon: '👑', check: (p) => p.totalXP >= 1000 },
  { id: 'first-review', name: 'Spaced Out', desc: 'Finish your first review', icon: '🧠', check: (p) => (p.reviewsCompleted || 0) >= 1 },
  { id: 'recall-100', name: 'Total Recall', desc: 'Recall 100 cards in review', icon: '🎯', check: (p) => (p.calibration?.sureTotal || 0) + (p.calibration?.shakyTotal || 0) >= 100 },
  { id: 'mastery-10', name: 'Durable', desc: 'Master 10 lessons through spaced recall', icon: '💎', check: (p) => masteredLessonCount(p) >= 10 },
];

// ============================================================
// DATE / STREAK HELPERS
// ============================================================

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function daysBetween(aISO, bISO) {
  const a = new Date(aISO + 'T00:00:00');
  const b = new Date(bISO + 'T00:00:00');
  return Math.round((b - a) / 86400000);
}

function rolloverIfNeeded(p) {
  const today = todayISO();
  if (p.todayDate !== today) return { ...p, todayDate: today, todayLessons: 0, reviewsToday: 0 };
  return p;
}

function applyStreak(p) {
  const today = todayISO();
  if (!p.lastActiveDate) {
    return { ...p, streak: 1, longestStreak: Math.max(p.longestStreak, 1), lastActiveDate: today };
  }
  if (p.lastActiveDate === today) return p;
  const gap = daysBetween(p.lastActiveDate, today);
  if (gap === 1) {
    const s = p.streak + 1;
    return { ...p, streak: s, longestStreak: Math.max(p.longestStreak, s), lastActiveDate: today };
  }
  if (gap === 2 && p.streakShields > 0) {
    const s = p.streak + 1;
    return { ...p, streakShields: p.streakShields - 1, streak: s, longestStreak: Math.max(p.longestStreak, s), lastActiveDate: today };
  }
  return { ...p, streak: 1, lastActiveDate: today };
}

function newlyEarnedBadges(p) {
  return BADGE_DEFS.filter(b => !p.badges.includes(b.id) && b.check(p)).map(b => b.id);
}

// ============================================================
// VARIABLE REWARDS
// ============================================================

function rollLessonReward(progress) {
  let xp = 8 + Math.floor(Math.random() * 8); // 8–15
  let lucky = false;
  if (Math.random() < 0.12) { xp *= 2; lucky = true; }
  let multiplied = false;
  if (progress.multiplierActiveOn === todayISO()) { xp *= 2; multiplied = true; }
  return { xp, lucky, multiplied };
}
function pickCelebration() { return CELEBRATIONS[Math.floor(Math.random() * CELEBRATIONS.length)]; }
function pickLoot() { return LOOT_REWARDS[Math.floor(Math.random() * LOOT_REWARDS.length)]; }
function shouldGetLoot(completedCount) {
  if (completedCount === 0) return false;
  if (completedCount % 10 === 0) return true;
  if (completedCount % 5 === 0) return Math.random() < 0.6;
  return false;
}

// ============================================================
// SPACED RETRIEVAL — item catalog + Leitner scheduler
// ============================================================
// Every `fill` step is an independently scheduled retrieval card so that
// concepts resurface at EXPANDING intervals across sessions (spacing) and
// get shuffled together at review time (interleaving). itemId is stable:
//   itemId = `${lessonId}#${stepIdx}`

const ALL_FILL_ITEMS = [];
COURSE.levels.forEach(level => {
  level.lessons.forEach(lesson => {
    const ex = EXERCISES[lesson.id];
    if (!ex) return;
    ex.steps.forEach((step, stepIdx) => {
      if (step.type === 'fill') {
        ALL_FILL_ITEMS.push({
          itemId: `${lesson.id}#${stepIdx}`,
          lessonId: lesson.id,
          lessonTitle: ex.title,
          levelId: level.id,
          levelTitle: level.title,
          stepIdx,
        });
      }
    });
  });
});
const FILL_ITEM_BY_ID = Object.fromEntries(ALL_FILL_ITEMS.map(it => [it.itemId, it]));

function fillStepFor(itemId) {
  const it = FILL_ITEM_BY_ID[itemId];
  if (!it) return null;
  return EXERCISES[it.lessonId]?.steps[it.stepIdx] || null;
}

// Distractor pool per level — used to widen the option set as a card matures.
const LEVEL_TOKEN_POOL = {};
ALL_FILL_ITEMS.forEach(it => {
  const step = EXERCISES[it.lessonId].steps[it.stepIdx];
  if (!LEVEL_TOKEN_POOL[it.levelId]) LEVEL_TOKEN_POOL[it.levelId] = new Set();
  (step.options || []).forEach(o => LEVEL_TOKEN_POOL[it.levelId].add(o));
});
Object.keys(LEVEL_TOKEN_POOL).forEach(k => { LEVEL_TOKEN_POOL[k] = [...LEVEL_TOKEN_POOL[k]]; });

// Expanding review intervals (days) indexed by box. Box 1 = first review next day.
const REVIEW_INTERVALS = [1, 3, 7, 16, 35, 75];
const MASTERY_BOX = 3;   // a card counts as "mastered" once it survives to box 3
const REVIEW_CAP = 12;   // max cards per Daily Review (wellbeing: review is finite)

function addDaysISO(iso, n) {
  const d = new Date((iso || todayISO()) + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Card shape: { box, due, reps, lapses, lastSeen }
function freshCard() {
  return { box: 1, due: addDaysISO(todayISO(), REVIEW_INTERVALS[0]), reps: 0, lapses: 0, lastSeen: todayISO() };
}

// Seed a card the first time an item is learned in a normal lesson. Replaying a
// lesson must NOT reset a card that has already matured, so we keep the stronger one.
function seedCardOnLearn(srs, itemId, firstTry) {
  if (srs[itemId]) return srs;
  const card = freshCard();
  // Aced it → spaced to tomorrow. Stumbled → resurface in TODAY's review (corrective recall).
  if (!firstTry) { card.box = 1; card.due = todayISO(); card.lapses = 1; }
  return { ...srs, [itemId]: card };
}

// Grade a card after a review attempt and reschedule it.
function gradeCard(card, correct, firstTry) {
  const base = card || freshCard();
  const today = todayISO();
  if (correct && firstTry) {
    const box = Math.min(base.box + 1, REVIEW_INTERVALS.length);
    return { box, due: addDaysISO(today, REVIEW_INTERVALS[box - 1]), reps: base.reps + 1, lapses: base.lapses, lastSeen: today };
  }
  if (correct) {
    // Right, but needed a second try or a hint — hold the box, see again soon.
    return { ...base, due: addDaysISO(today, 1), reps: base.reps + 1, lastSeen: today };
  }
  // Missed — lapse back to box 1 (the spacing must rebuild).
  return { box: 1, due: addDaysISO(today, 1), reps: base.reps + 1, lapses: base.lapses + 1, lastSeen: today };
}

// Recall rung a card is tested at — scaffolds withdraw as the card matures.
//   box 1     -> rung 1 (tap chips)
//   box 2     -> rung 2 (chips + extra distractors, harder discrimination)
//   box >= 3  -> rung 3 (type it from memory)
function rungForBox(box) {
  if (box >= MASTERY_BOX) return 3;
  if (box === 2) return 2;
  return 1;
}

// Fisher–Yates shuffle (used to interleave review items across levels).
function interleaveShuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function dueCount(progress) {
  const today = todayISO();
  const srs = progress.srs || {};
  return Object.keys(srs).filter(id => FILL_ITEM_BY_ID[id] && srs[id].due <= today).length;
}

// Today's review queue: due cards, interleaved across levels, capped for wellbeing.
function buildReviewQueue(progress) {
  const today = todayISO();
  const srs = progress.srs || {};
  const due = Object.keys(srs)
    .filter(id => FILL_ITEM_BY_ID[id] && srs[id].due <= today)
    .map(id => ({ ...FILL_ITEM_BY_ID[id], card: srs[id] }));
  return interleaveShuffle(due).slice(0, REVIEW_CAP);
}

// Mastery: lessons whose every fill-card has reached the mastery box (survived spaced recall).
function masteredLessonCount(progress) {
  const srs = progress.srs || {};
  let n = 0;
  COURSE.levels.forEach(level => level.lessons.forEach(lesson => {
    const items = ALL_FILL_ITEMS.filter(it => it.lessonId === lesson.id);
    if (items.length === 0) return;
    if (items.every(it => (srs[it.itemId]?.box || 0) >= MASTERY_BOX)) n++;
  }));
  return n;
}

// Calibration: combat the illusion of fluency by tracking felt-confidence vs. truth.
function calibrationRate(cal, key) {
  if (!cal) return null;
  const total = cal[`${key}Total`] || 0;
  if (total === 0) return null;
  return Math.round(((cal[`${key}Correct`] || 0) / total) * 100);
}

// ============================================================
// MASCOT — Tora: a python coiled up an upright torch with a blue flame
// (drawn back-coils → torch → flame → front-coils → head for depth)
// ============================================================

function CMascot({ size = 200 }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} aria-label="PyTorch mascot: a python coiled around a blue-flame torch">
      <defs>
        <radialGradient id="torchGlow" cx="50%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#3b82f6" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flameOuter" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="flameInner" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="65%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#f0f9ff" />
        </linearGradient>
        <linearGradient id="torchMetal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="42%" stopColor="#f59e0b" />
          <stop offset="56%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#7c2d12" />
        </linearGradient>
        <linearGradient id="bowlMetal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c2d12" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="snakeBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="snakeBelly" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dcfce7" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>

      {/* Glow cast by the flame */}
      <circle cx="100" cy="68" r="96" fill="url(#torchGlow)" />

      {/* Python — BACK coils (behind the shaft; the shaft hides their middles) */}
      <g stroke="url(#snakeBody)" strokeWidth="15" fill="none" strokeLinecap="round">
        <path d="M122 172 Q100 144 78 150" />
        <path d="M122 128 Q100 102 78 106" />
      </g>

      {/* Torch: base, shaft, brazier */}
      <g>
        <rect x="84" y="175" width="32" height="9" rx="3" fill="url(#bowlMetal)" stroke="#78350f" strokeWidth="1" />
        <rect x="80" y="182" width="40" height="6" rx="3" fill="#78350f" />
        <path d="M91 94 L109 94 L107 178 L93 178 Z" fill="url(#torchMetal)" stroke="#7c2d12" strokeWidth="1" />
        <rect x="90" y="149" width="20" height="5" rx="2" fill="#7c2d12" opacity="0.55" />
        <rect x="90" y="120" width="20" height="5" rx="2" fill="#7c2d12" opacity="0.55" />
        <path d="M78 79 Q100 71 122 79 L112 96 Q100 100 88 96 Z" fill="url(#bowlMetal)" stroke="#7c2d12" strokeWidth="1.2" />
        <ellipse cx="100" cy="79" rx="22" ry="5" fill="#fcd34d" />
        <ellipse cx="100" cy="79" rx="15" ry="3" fill="#1e3a8a" opacity="0.45" />
      </g>

      {/* Blue flame */}
      <g>
        <path d="M100 16 C126 46, 121 73, 100 81 C79 73, 74 46, 100 16 Z" fill="url(#flameOuter)" />
        <path d="M100 36 C113 53, 112 69, 100 79 C94 67, 94 53, 100 36 Z" fill="url(#flameInner)" opacity="0.95" />
        <path d="M100 30 C106 48, 105 68, 100 79 C97 66, 96 48, 100 30 Z" fill="#f0f9ff" opacity="0.9" />
      </g>

      {/* Python — FRONT coils (over the shaft) */}
      <g stroke="url(#snakeBody)" strokeWidth="15" fill="none" strokeLinecap="round">
        <path d="M94 185 Q110 191 122 172" />
        <path d="M78 150 Q100 158 122 128" />
        <path d="M78 106 Q90 96 106 88" />
      </g>
      {/* Belly sheen on the front coils */}
      <g stroke="url(#snakeBelly)" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8">
        <path d="M96 183 Q110 188 120 173" />
        <path d="M81 150 Q100 156 120 130" />
      </g>

      {/* Tail tip at the base */}
      <path d="M94 185 Q83 189 81 182 Q88 183 94 185 Z" fill="url(#snakeBody)" />

      {/* Python head, rising past the brazier */}
      <g transform="translate(106, 86) rotate(-18)">
        <ellipse cx="0" cy="0" rx="15" ry="11" fill="url(#snakeBody)" />
        <ellipse cx="-1" cy="2" rx="10" ry="6" fill="url(#snakeBelly)" opacity="0.7" />
        <circle cx="6" cy="-3" r="2.6" fill="#0f172a" />
        <circle cx="6.8" cy="-3.8" r="0.9" fill="#fff" />
        <circle cx="-4" cy="-3" r="2.2" fill="#0f172a" />
        <circle cx="-3.4" cy="-3.7" r="0.8" fill="#fff" />
        <path d="M13 2 L22 3 L18 5 L24 6" stroke="#f43f5e" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// ============================================================
// LESSON STONE (the isometric checkpoint puck)
// ============================================================

function LessonStone({ status, isReview = false, size = 120 }) {
  // status: 'completed' | 'current' | 'locked'
  const colors = {
    completed: { top: '#c084fc', mid: '#a855f7', shadow: '#7e22ce', highlight: '#e9d5ff' },
    current: { top: '#c084fc', mid: '#a855f7', shadow: '#7e22ce', highlight: '#e9d5ff' },
    locked: { top: '#525252', mid: '#404040', shadow: '#262626', highlight: '#737373' },
  };
  const c = colors[status];
  const w = size, h = size * 0.8;

  if (isReview) {
    // Hexagonal review stone
    return (
      <svg viewBox="0 0 120 96" width={w} height={h}>
        <defs>
          <radialGradient id={`hex-${status}`} cx="50%" cy="40%">
            <stop offset="0%" stopColor={c.highlight} />
            <stop offset="60%" stopColor={c.top} />
            <stop offset="100%" stopColor={c.mid} />
          </radialGradient>
        </defs>
        <polygon points="30,75 12,48 30,21 90,21 108,48 90,75" fill={c.shadow} transform="translate(0,6)" />
        <polygon points="30,75 12,48 30,21 90,21 108,48 90,75" fill={`url(#hex-${status})`} />
        <polygon points="42,60 24,48 42,36 78,36 96,48 78,60" fill={c.highlight} opacity="0.4" />
        {status === 'completed' && (
          <path d="M 48 48 L 56 56 L 72 40" stroke="#fff" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 96" width={w} height={h}>
      <defs>
        <radialGradient id={`stone-${status}`} cx="50%" cy="35%">
          <stop offset="0%" stopColor={c.highlight} />
          <stop offset="55%" stopColor={c.top} />
          <stop offset="100%" stopColor={c.mid} />
        </radialGradient>
      </defs>
      {/* Side / depth */}
      <ellipse cx="60" cy="58" rx="52" ry="20" fill={c.shadow} />
      {/* Top face */}
      <ellipse cx="60" cy="48" rx="52" ry="20" fill={`url(#stone-${status})`} />
      {/* Inner ring */}
      <ellipse cx="60" cy="46" rx="36" ry="13" fill="none" stroke={c.highlight} strokeWidth="3" opacity="0.6" />
      <ellipse cx="60" cy="46" rx="22" ry="8" fill={c.highlight} opacity="0.35" />
      {/* Check mark */}
      {status === 'completed' && (
        <path d="M 48 46 L 56 53 L 73 38" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {status === 'current' && (
        <path d="M 48 46 L 56 53 L 73 38" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.0" />
      )}
    </svg>
  );
}

// Glowing pulse halo for the current stone
function CurrentHalo({ children }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full" style={{
        background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(168,85,247,0) 70%)',
        animation: 'pulse-halo 2.4s ease-in-out infinite',
        transform: 'scale(1.4)',
      }} />
      {children}
    </div>
  );
}

// ============================================================
// MISCONCEPTION FEEDBACK — the one-line "why", shown on check.
// ============================================================
// Feedback is where learning happens (Make It Stick): correct the model,
// don't just mark right/wrong. Authored for the conceptually loaded items;
// everything else falls back to a generated line that still names the answer.
// Keyed by itemId = `${lessonId}#${stepIdx}`.
const EXPLAIN = {
  'l1-3#1': 'A comprehension reads [expr for x in it]: `**` is "to the power of", and `for` opens the loop clause.',
  'l3-2#1': 'axis=0 collapses DOWN the rows, leaving one value per column. Ask "which axis disappears?" — axis 0 does.',
  'l3-2#2': 'Per-sample (per-row) means reduce across the columns, which is axis=1.',
  'l3-3#1': 'A per-FEATURE mean reduces over the samples → axis=0, giving a (5,) row that broadcasts down every row.',
  'l4-2#2': 'Class labels must be torch.long (int64). CrossEntropyLoss expects long targets — float here is the classic crash.',
  'l4-3#1': 'torch.cuda.is_available() returns a bool — the standard guard for "use the GPU if there is one."',
  'l5-1#1': '-1 lets PyTorch infer that dimension from the total size, so you keep the batch dim (64) and flatten the rest.',
  'l5-2#1': 'permute takes the NEW order of existing axis indices: (N,H,W,C)=(0,1,2,3) → (N,C,H,W) = (0,3,1,2).',
  'l5-5#2': 'argmax(dim=1) returns the index of the largest logit per row — that index IS the predicted class.',
  'l6-2#1': '.backward() walks the graph and fills .grad on every tracked tensor. You call it on the loss.',
  'l6-2#2': 'backward() needs a scalar, so reduce first — .sum() (or .mean()) turns the vector into one number.',
  'l6-4#1': 'with torch.no_grad(): turns off graph tracking — faster, less memory, and standard for plain inference.',
  'l7-2#2': "The next layer's in_features must match the previous layer's out_features (128). Mismatched sizes are the #1 model bug.",
  'l7-4#1': 'Without a nonlinearity like relu between linears, the whole stack collapses into a single linear layer.',
  'l8-1#1': 'CrossEntropyLoss is the classification default — it takes raw logits and integer labels (no softmax needed).',
  'l8-3#1': "zero_grad() clears the last step's gradients. Skip it and gradients ACCUMULATE — the classic silent bug.",
  'l8-3#2': 'step() applies the update using the gradients backward() just computed. Order: zero_grad → backward → step.',
  'l9-3#1': 'The heartbeat: optimizer.zero_grad() → loss.backward() → optimizer.step(). Always that order.',
  'l9-4#1': 'epoch loop → batch loop → forward, loss, zero_grad, backward, step. This skeleton is the whole course.',
  'l9-6#1': 'loss.backward() then optimizer.step(); .item() logs a plain number without holding onto the graph.',
  'l11-1#1': 'model.eval() switches dropout/batchnorm to inference behavior. Forgetting it makes eval results wobble.',
  'l11-2#1': 'Inside no_grad, argmax(dim=1) turns each row of logits into its predicted class index.',
  'l11-3#1': '(preds == yb) is a boolean tensor; .float().mean() is the fraction that are True — the accuracy.',
  'l12-4#1': '.values drops to a NumPy array; wrap it with torch.tensor as float32 so the model accepts it.',
};

function genericExplain(step) {
  const n = (step.code.join(' ').match(/___/g) || []).length;
  const answers = (step.options || []).slice(0, n).map(a => (a === '' ? '(empty)' : a));
  if (answers.length === 0) return '';
  if (answers.length === 1) return `The piece that fits is \`${answers[0]}\`.`;
  return `In order, the blanks are: ${answers.map(a => `\`${a}\``).join(' → ')}.`;
}

function explainFor(itemId, step) {
  return (itemId && EXPLAIN[itemId]) || genericExplain(step);
}

// Believable filename for the code panel, by level (replaces the old 'main.c').
function fileNameFor(levelId) {
  return ({
    1: 'python.py', 2: 'numpy_basics.py', 3: 'numpy_ops.py', 4: 'tensors.py',
    5: 'tensor_ops.py', 6: 'autograd.py', 7: 'model.py', 8: 'optim.py',
    9: 'train.py', 10: 'data.py', 11: 'evaluate.py', 12: 'pandas_intro.py',
  })[levelId] || 'main.py';
}

// ============================================================
// CODE RENDERING with simple syntax highlighting
// ============================================================

const PY_KEYWORDS = new Set([
  'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del',
  'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in',
  'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while',
  'with', 'yield',
]);
const PY_LITERALS = new Set(['True', 'False', 'None']);
// Common ML namespaces/builtins worth tinting even without a call paren.
const PY_BUILTINS = new Set([
  'torch', 'np', 'nn', 'F', 'pd', 'optim', 'self', 'print', 'len', 'range',
  'enumerate', 'zip', 'super',
]);
const STRING_PREFIXES = new Set(['f', 'r', 'b', 'rb', 'br', 'fr', 'rf', 'u']);

function tokenizePy(text) {
  // Returns an array of { type, text } tokens for a single line of Python.
  const tokens = [];
  let i = 0;
  const readString = (start, quote) => {
    let j = start + 1;
    while (j < text.length && text[j] !== quote) {
      if (text[j] === '\\' && j + 1 < text.length) j += 2;
      else j++;
    }
    return j + 1; // index just past the closing quote (or end of line)
  };
  while (i < text.length) {
    const ch = text[i];

    // Comment — Python uses '#' to end of line (NOT '//', which is floor-division).
    if (ch === '#') {
      tokens.push({ type: 'comment', text: text.slice(i) });
      break;
    }
    // String literal, optionally with a prefix like f"" or r''.
    if (ch === '"' || ch === "'") {
      const end = readString(i, ch);
      tokens.push({ type: 'string', text: text.slice(i, end) });
      i = end;
      continue;
    }
    // Number (int/float, simple exponent).
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < text.length && /[0-9._eE]/.test(text[j])) j++;
      tokens.push({ type: 'number', text: text.slice(i, j) });
      i = j;
      continue;
    }
    // Identifier / keyword / string-prefix.
    if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (j < text.length && /[A-Za-z0-9_]/.test(text[j])) j++;
      const word = text.slice(i, j);
      // String prefix immediately followed by a quote: f"...", rb'...'
      if (STRING_PREFIXES.has(word.toLowerCase()) && (text[j] === '"' || text[j] === "'")) {
        const end = readString(j, text[j]);
        tokens.push({ type: 'string', text: text.slice(i, end) });
        i = end;
        continue;
      }
      if (PY_KEYWORDS.has(word)) tokens.push({ type: 'keyword', text: word });
      else if (PY_LITERALS.has(word)) tokens.push({ type: 'literal', text: word });
      else if (text[j] === '(') tokens.push({ type: 'fn', text: word });
      else if (PY_BUILTINS.has(word)) tokens.push({ type: 'builtin', text: word });
      else tokens.push({ type: 'ident', text: word });
      i = j;
      continue;
    }
    // Decorator marker (@name) only at the visual start of the line.
    if (ch === '@' && /[A-Za-z_]/.test(text[i + 1] || '') && tokens.every(t => t.text.trim() === '')) {
      tokens.push({ type: 'decorator', text: ch });
      i++;
      continue;
    }
    // Punctuation / operators (covers @ as matmul, //, **, etc.).
    tokens.push({ type: 'punct', text: ch });
    i++;
  }
  return tokens;
}

const TOKEN_CLASSES = {
  keyword: 'text-fuchsia-400',
  decorator: 'text-pink-400',
  string: 'text-yellow-300',
  number: 'text-orange-300',
  literal: 'text-fuchsia-400',
  fn: 'text-cyan-300',
  builtin: 'text-sky-300',
  ident: 'text-slate-100',
  comment: 'text-slate-500 italic',
  punct: 'text-slate-400',
};

// Render a single line with potential blanks (___). When a blank is found,
// it inserts a Blank component using the next blank index.
function CodeLine({ line, lineNumber, filledValues, activeBlankIndex, blankStartIndex, editable = false, onInput }) {
  // Split by ___ but keep the marker; track how many blanks we've placed
  const segments = line.split('___');
  const out = [];
  for (let s = 0; s < segments.length; s++) {
    const seg = segments[s];
    if (seg.length > 0) {
      const tokens = tokenizePy(seg);
      tokens.forEach((tok, idx) => {
        const cls = TOKEN_CLASSES[tok.type] || 'text-slate-100';
        // preserve whitespace
        out.push(<span key={`${s}-${idx}`} className={cls}>{tok.text}</span>);
      });
    }
    if (s < segments.length - 1) {
      const blankIdx = blankStartIndex + s;
      out.push(
        <Blank
          key={`blank-${s}`}
          index={blankIdx}
          value={filledValues[blankIdx]}
          isActive={blankIdx === activeBlankIndex}
          editable={editable}
          onInput={onInput}
        />
      );
    }
  }
  return (
    <div className="flex items-start font-mono leading-7" style={{ fontSize: '15px' }}>
      <span className="text-slate-600 w-7 flex-shrink-0 select-none text-right pr-3">{lineNumber}</span>
      <div className="flex-1 whitespace-pre">
        {/* preserve leading spaces */}
        {out.length === 0 ? <span>&nbsp;</span> : out}
      </div>
    </div>
  );
}

function Blank({ index, value, isActive, editable = false, onInput }) {
  // Rung-3 (type-to-recall): an editable input in place of the blank.
  if (editable) {
    const v = value || '';
    return (
      <input
        type="text"
        value={v}
        onChange={(e) => onInput && onInput(index, e.target.value)}
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="off"
        className="inline-block align-middle px-1 mx-0.5 rounded bg-slate-800 border-2 border-violet-600/70 text-violet-200 font-mono outline-none focus:border-violet-400"
        style={{ width: `${Math.max(v.length, 3) + 1}ch`, height: '26px', fontSize: '15px' }}
      />
    );
  }
  if (value === undefined || value === null) {
    return (
      <span
        className={`inline-block align-middle px-1 mx-0.5 rounded border-2 ${
          isActive ? 'border-violet-400 bg-violet-500/10' : 'border-violet-700 bg-slate-800/40'
        }`}
        style={{
          minWidth: '34px',
          height: '26px',
          animation: isActive ? 'blink 1s steps(1) infinite' : 'none',
        }}
      />
    );
  }
  // Filled — render the value with token styling ('' is a valid answer, e.g. a slice).
  const tokens = tokenizePy(value === '' ? ' ' : value);
  return (
    <span className="inline-block align-middle px-1.5 mx-0.5 rounded bg-violet-500/15 border border-violet-500/40">
      {tokens.map((tok, idx) => (
        <span key={idx} className={TOKEN_CLASSES[tok.type] || 'text-slate-100'}>
          {tok.text}
        </span>
      ))}
    </span>
  );
}

// ============================================================
// FILL CARD — the reusable retrieval mechanic (lessons + reviews)
// ============================================================
// One fill step, owned end-to-end. The recall RUNG sets how much scaffolding
// is offered, and scaffolds withdraw as a card matures across sessions
// (desirable difficulty — Make It Stick):
//   rung 1 → tap chips                 (first exposure / fresh card)
//   rung 2 → chips + extra distractors (forces discrimination, not slot-filling)
//   rung 3 → type it from memory       (closest to free recall the phone allows)
// `review` mode grades a single attempt (honest calibration) and asks the
// learner to call their confidence BEFORE the reveal.
function FillCard({ step, itemId, rung = 1, review = false, fileName = 'main.py', onResult, onAskTutor }) {
  const blankPerLine = step.code.map(line => (line.match(/___/g) || []).length);
  const totalBlanks = blankPerLine.reduce((a, b) => a + b, 0);
  const answers = step.options.slice(0, totalBlanks);
  const hasEmptyAnswer = answers.some(a => a === '');
  // Can't type an empty-string token, so such items stay on chips even at rung 3.
  const canType = rung >= 3 && !hasEmptyAnswer;

  const [mode, setMode] = useState(canType ? 'type' : 'chips');
  const [filled, setFilled] = useState({});      // { blankIdx: value }
  const [usedKey, setUsedKey] = useState({});    // { blankIdx: chipKey } (chips mode)
  const [activeBlank, setActiveBlank] = useState(0);
  const [checkResult, setCheckResult] = useState(null); // null | 'correct' | 'wrong'
  const [missed, setMissed] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [confidence, setConfidence] = useState(null);   // 'sure' | 'shaky'
  const [locked, setLocked] = useState(false);          // review: input frozen after the graded check
  const [graded, setGraded] = useState(null);

  // Reset when the card changes (review queue advances, or step changes).
  useEffect(() => {
    setMode(canType ? 'type' : 'chips');
    setFilled({}); setUsedKey({}); setActiveBlank(0);
    setCheckResult(null); setMissed(false); setHintUsed(false);
    setConfidence(null); setLocked(false); setGraded(null);
  }, [itemId, step, rung]); // eslint-disable-line react-hooks/exhaustive-deps

  // Chip pool — shuffled so the answer isn't always the first chip; rung 2+ widens it.
  const chips = useMemo(() => {
    let pool = [...step.options];
    if (rung >= 2) {
      const levelId = FILL_ITEM_BY_ID[itemId]?.levelId;
      const extra = (LEVEL_TOKEN_POOL[levelId] || []).filter(v => !pool.includes(v));
      pool = [...pool, ...interleaveShuffle(extra).slice(0, 3)];
    }
    return interleaveShuffle(pool.map((value, i) => ({ value, key: `${i}:${value}` })));
  }, [itemId, rung, step]);

  const usedKeys = new Set(Object.values(usedKey));
  const valueFor = (i) => (mode === 'type' ? (filled[i] || '').trim() : filled[i]);
  const allFilled = mode === 'type'
    ? Array.from({ length: totalBlanks }).every((_, i) => (filled[i] || '').trim().length > 0)
    : Object.keys(filled).length === totalBlanks;

  const handleChip = (chip) => {
    if (locked || usedKeys.has(chip.key) || activeBlank >= totalBlanks) return;
    const nf = { ...filled, [activeBlank]: chip.value };
    const nk = { ...usedKey, [activeBlank]: chip.key };
    setFilled(nf); setUsedKey(nk);
    if (checkResult === 'wrong') setCheckResult(null);
    let next = activeBlank + 1;
    while (nf[next] !== undefined) next++;
    setActiveBlank(next);
  };

  const handleBackspace = () => {
    if (locked) return;
    const keys = Object.keys(filled).map(Number).sort((a, b) => a - b);
    if (!keys.length) return;
    const last = keys[keys.length - 1];
    const nf = { ...filled }; delete nf[last];
    const nk = { ...usedKey }; delete nk[last];
    setFilled(nf); setUsedKey(nk); setActiveBlank(last);
    if (checkResult === 'wrong') setCheckResult(null);
  };

  const handleType = (i, val) => {
    if (locked) return;
    setFilled({ ...filled, [i]: val });
    if (checkResult === 'wrong') setCheckResult(null);
  };

  const revealChips = () => {
    // Friction relief / scaffold-on-failure: drop to chips, but it counts as a hint.
    setHintUsed(true); setMode('chips'); setFilled({}); setUsedKey({}); setActiveBlank(0);
  };

  const startOver = () => {
    setFilled({}); setUsedKey({}); setActiveBlank(0);
    if (checkResult === 'wrong') setCheckResult(null);
  };

  const handleCheck = () => {
    if (!allFilled) return;
    if (review && !confidence) return; // self-assess first (calibration)
    const correct = answers.every((ans, i) => valueFor(i) === ans);
    const firstTry = !missed && !hintUsed;
    if (!correct) setMissed(true);
    setCheckResult(correct ? 'correct' : 'wrong');
    if (review) {
      setLocked(true);
      setGraded({ correct, firstTry, confidence });
    } else if (correct) {
      setGraded({ correct: true, firstTry, confidence: null });
    }
  };

  const handleContinue = () => {
    onResult(graded || { correct: checkResult === 'correct', firstTry: !missed && !hintUsed, confidence });
  };

  const showContinue = review ? locked : checkResult === 'correct';
  const explainText = (checkResult && (review || checkResult === 'correct')) ? explainFor(itemId, step) : null;

  return (
    <>
      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 pb-3">
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-base leading-snug text-slate-100 flex-1">{step.prompt}</p>
            {mode === 'type' && (
              <span className="text-[10px] font-bold tracking-wide px-2 py-1 rounded-full bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30 flex-shrink-0">
                RECALL
              </span>
            )}
          </div>

          {/* Code panel */}
          <div className="rounded-2xl overflow-hidden border border-slate-800">
            <div className="bg-slate-800/70 px-3 py-2 text-xs font-bold tracking-wide text-slate-300 flex items-center gap-1.5">
              <span>▸</span><span>{fileName}</span>
            </div>
            <div className="bg-slate-950 px-3 py-3.5">
              {(() => {
                let blankCount = 0;
                return step.code.map((line, lineIdx) => {
                  const startIdx = blankCount;
                  blankCount += blankPerLine[lineIdx];
                  return (
                    <CodeLine
                      key={lineIdx}
                      line={line}
                      lineNumber={lineIdx + 1}
                      filledValues={filled}
                      activeBlankIndex={activeBlank}
                      blankStartIndex={startIdx}
                      editable={mode === 'type'}
                      onInput={handleType}
                    />
                  );
                });
              })()}
            </div>

            {/* Input bar */}
            {mode === 'chips' ? (
              <div className="bg-slate-800/70 px-2.5 py-2.5 flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={handleBackspace}
                  disabled={locked}
                  className="w-9 h-9 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center active:scale-95 disabled:opacity-40"
                >
                  <Delete className="w-4 h-4 text-slate-400" strokeWidth={2} />
                </button>
                {chips.map((chip) => {
                  const used = usedKeys.has(chip.key);
                  return (
                    <button
                      key={chip.key}
                      disabled={used || locked}
                      onClick={() => handleChip(chip)}
                      className={`px-2.5 h-9 rounded-md font-mono text-sm border transition-all ${
                        used
                          ? 'bg-slate-900/40 border-slate-800/50 text-slate-700'
                          : 'bg-slate-900 border-slate-700 text-violet-300 hover:bg-slate-800 active:scale-95'
                      }`}
                    >
                      {chip.value === '' ? '⌴' : chip.value}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="bg-slate-800/70 px-2.5 py-2.5 flex items-center justify-between">
                <span className="text-xs text-slate-500">Type each blank from memory.</span>
                {!locked && (
                  <button
                    onClick={revealChips}
                    className="text-xs font-semibold text-violet-300 px-2.5 py-1.5 rounded-md border border-slate-700 active:scale-95"
                  >
                    Need the chips?
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Start over (chips only, before grading) */}
          {mode === 'chips' && !locked && (
            <div className="flex justify-end mt-4">
              <button onClick={startOver} className="flex items-center gap-1.5 text-slate-300 text-sm font-semibold">
                <RotateCcw className="w-4 h-4" strokeWidth={2.2} />
                Start over
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer: confidence (review) + feedback + action */}
      <div className={`border-t transition-colors ${
        checkResult === 'correct' ? 'bg-emerald-950/60 border-emerald-700' :
        checkResult === 'wrong' ? 'bg-rose-950/60 border-rose-700' :
        'bg-black border-slate-900'
      }`}>
        {/* Confidence call — combats the illusion of fluency (calibration). */}
        {review && !checkResult && (
          <div className="px-5 pt-3">
            <div className="text-xs text-slate-400 mb-2">Before you check — how sure are you?</div>
            <div className="flex gap-2">
              {[
                { id: 'shaky', label: '🤔 Shaky' },
                { id: 'sure', label: '💪 Got it' },
              ].map(c => (
                <button
                  key={c.id}
                  onClick={() => setConfidence(c.id)}
                  className={`flex-1 h-10 rounded-full text-sm font-bold border transition-colors ${
                    confidence === c.id
                      ? 'bg-violet-500 text-white border-violet-400'
                      : 'bg-slate-900 text-slate-300 border-slate-700'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {checkResult && (
          <div className="px-5 pt-3 pb-1">
            <div className={`font-bold ${checkResult === 'correct' ? 'text-emerald-300' : 'text-rose-300'}`}>
              {checkResult === 'correct'
                ? (review && confidence === 'shaky' ? 'Correct — better than you thought!' : 'Correct!')
                : (review ? 'Missed — here it is:' : 'Not quite — try again.')}
            </div>
            {explainText && <div className="text-sm text-slate-300 mt-1 leading-snug">{explainText}</div>}
          </div>
        )}

        <div className="px-3 pt-3 pb-3 flex items-center gap-2">
          {showContinue ? (
            <button
              onClick={handleContinue}
              className={`flex-1 h-12 rounded-full text-white font-bold text-base shadow-lg active:scale-95 ${
                checkResult === 'correct' ? 'bg-emerald-500 shadow-emerald-900/50' : 'bg-violet-500 shadow-violet-900/50'
              }`}
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleCheck}
              disabled={!allFilled || (review && !confidence)}
              className={`flex-1 h-12 rounded-full font-bold text-base transition-colors ${
                allFilled && !(review && !confidence)
                  ? 'bg-violet-500 text-white shadow-lg shadow-violet-900/50 active:scale-95'
                  : 'bg-slate-800 text-slate-600'
              }`}
            >
              Check
            </button>
          )}
        </div>

        {onAskTutor && (
          <div className="px-3 pb-3">
            <button
              onClick={onAskTutor}
              className="w-full flex items-center gap-2 bg-slate-900/70 border border-slate-800 rounded-full px-4 h-11 active:scale-[0.98] transition-transform"
            >
              <MessageSquare className="w-4 h-4 text-violet-400" />
              <span className="text-slate-300 text-sm flex-1 text-left">Ask the tutor a question</span>
              <Sparkle className="w-3.5 h-3.5 text-violet-400" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ============================================================
// PROGRESS — persistent storage helpers
// ============================================================

const PROGRESS_KEY = 'thinking-in-pytorch:progress:v1';

function defaultProgress() {
  return {
    version: 2,
    onboarded: false,
    mascotName: 'Tora',
    motivation: null,
    dailyGoal: 1,
    reminderTime: '19:00',
    completed: {},
    currentLessonId: 'l1-1',
    totalXP: 0,
    streak: 0,
    longestStreak: 0,
    lastActiveDate: null,
    streakShields: 0,
    todayDate: todayISO(),
    todayLessons: 0,
    badges: [],
    activityDays: [],
    multiplierActiveOn: null,
    // Spaced retrieval (Layer 3)
    srs: {},                  // { itemId: { box, due, reps, lapses, lastSeen } }
    reviewsToday: 0,          // review cards answered today (resets on rollover)
    reviewsCompleted: 0,      // lifetime review sessions finished
    calibration: { sureCorrect: 0, sureTotal: 0, shakyCorrect: 0, shakyTotal: 0 },
    reflections: [],          // [{ date, text }] short post-review reflections
    // Tutor logging (Layer 2)
    apiQuestionLog: [],   // [{ id, question, answer, lessonId, lessonTitle, timestamp, localMatchPreview, helpful }]
    localServedCount: 0,  // running counter of local-layer hits
    apiServedCount: 0,    // running counter of API-layer hits
    promotedEntries: [],  // user-promoted local entries [{ keywords, question, answer, sourceQuestionId }]
  };
}

async function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch (e) {
    // corrupted or missing
  }
  return defaultProgress();
}

async function saveProgress(progress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    // storage full / private mode
  }
}

// ============================================================
// STREAK / PROGRESS / LOOT components
// ============================================================

function StreakFlame({ count, size = 'md' }) {
  const s = size === 'lg' ? { flame: 32, text: 'text-2xl' }
          : size === 'sm' ? { flame: 16, text: 'text-sm' }
          :                 { flame: 22, text: 'text-base' };
  return (
    <div className="flex items-center gap-1">
      <Flame
        className={count > 0 ? 'text-orange-400' : 'text-slate-600'}
        fill={count > 0 ? '#fb923c' : 'none'}
        strokeWidth={2}
        style={{ width: s.flame, height: s.flame }}
      />
      <span className={`font-extrabold ${s.text} ${count > 0 ? 'text-orange-300' : 'text-slate-600'}`}>
        {count}
      </span>
    </div>
  );
}

// Endowed-progress bar — when value is non-zero we floor visible width at 4%
function ProgressBar({ value, max, color = 'violet' }) {
  const raw = max > 0 ? (value / max) * 100 : 0;
  const pct = value === 0 ? 0 : Math.max(4, raw);
  const colorClass = ({ violet: 'bg-violet-500', emerald: 'bg-emerald-500', orange: 'bg-orange-400' })[color] || 'bg-violet-500';
  return (
    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-700 ${colorClass}`} style={{ width: `${Math.min(100, pct)}%` }} />
    </div>
  );
}

function LootBoxReveal({ loot }) {
  const [opened, setOpened] = useState(false);
  return (
    <button
      onClick={() => !opened && setOpened(true)}
      className="w-full p-4 rounded-2xl border-2 border-amber-500/50 active:scale-95 transition-transform"
      style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(168,85,247,0.15))' }}
    >
      {!opened ? (
        <div className="flex items-center gap-3">
          <div className="text-4xl">🎁</div>
          <div className="text-left flex-1">
            <div className="text-xs text-amber-400 font-bold tracking-wider">SURPRISE</div>
            <div className="font-bold">Tap to open</div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="text-4xl">{loot.icon}</div>
          <div className="text-left flex-1">
            <div className="text-xs text-amber-400 font-bold tracking-wider">YOU GOT</div>
            <div className="font-bold">{loot.label}{loot.amount > 1 ? ` × ${loot.amount}` : ''}</div>
          </div>
        </div>
      )}
    </button>
  );
}

// ============================================================
// HOME SCREEN
// ============================================================

function HomeScreen({ progress, onStart, onStartReview, onTabChange, currentTab }) {
  const current = ALL_LESSONS.find(l => l.id === progress.currentLessonId) || ALL_LESSONS[0];
  const next = ALL_LESSONS[ALL_LESSONS.indexOf(current) + 1];
  const currentLevel = current.level;
  const motivationObj = MOTIVATIONS.find(m => m.id === progress.motivation);
  const goalMet = progress.todayLessons >= progress.dailyGoal;
  const completedAny = Object.keys(progress.completed).length > 0;
  const due = dueCount(progress);

  const hour = new Date().getHours();
  const greeting = hour < 11 ? 'Morning.'
                 : hour < 17 ? 'Afternoon.'
                 : hour < 21 ? 'Evening.'
                 :             'Late night?';

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <StatusBar />

      {/* Top bar: streak + shields + lightning */}
      <div className="px-5 pt-3 pb-1 flex items-center justify-between">
        <StreakFlame count={progress.streak} size="md" />
        <div className="flex items-center gap-2">
          {progress.streakShields > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              <Shield className="w-3.5 h-3.5 text-cyan-300" />
              <span className="text-xs font-bold text-cyan-300">{progress.streakShields}</span>
            </div>
          )}
          <button className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center">
            <Zap className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Greeting + motivation tagline */}
      <div className="px-5 mt-1">
        <h1 className="text-2xl font-extrabold">{greeting}</h1>
        {motivationObj && <p className="text-slate-500 text-sm mt-1">{motivationObj.tagline}</p>}
      </div>

      {/* Daily goal card */}
      <div className="mx-5 mt-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-bold">Today's goal</span>
          </div>
          <span className={`text-sm font-bold ${goalMet ? 'text-emerald-400' : 'text-slate-300'}`}>
            {progress.todayLessons} / {progress.dailyGoal} {goalMet && '✓'}
          </span>
        </div>
        <ProgressBar value={progress.todayLessons} max={progress.dailyGoal} color={goalMet ? 'emerald' : 'violet'} />
      </div>

      {/* Daily Review trigger — appears only when cards are actually due.
          The reward is recalling; the count is the itch that pulls you back. */}
      {due > 0 && (
        <button
          onClick={onStartReview}
          className="mx-5 mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-600/20 to-violet-600/20 border border-fuchsia-500/40 flex items-center gap-3 active:scale-[0.98] transition-transform text-left w-[calc(100%-2.5rem)]"
        >
          <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center text-xl flex-shrink-0">🧠</div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm">Daily Review</div>
            <div className="text-xs text-slate-400">{due} card{due > 1 ? 's' : ''} ready to strengthen</div>
          </div>
          <ArrowRight className="w-5 h-5 text-fuchsia-300 flex-shrink-0" />
        </button>
      )}

      {/* Level title */}
      <div className="text-center mt-4">
        <div className="text-violet-400 font-bold text-xs tracking-widest">LEVEL {currentLevel.id}</div>
        <div className="text-base font-bold mt-0.5">{currentLevel.title}</div>
      </div>

      {/* Mascot */}
      <div className="flex-1 flex items-center justify-center px-4 relative min-h-0">
        <CMascot size={160} />
      </div>

      {/* Continue card */}
      <div className="mx-4 mb-3 rounded-3xl border border-slate-800 p-4 bg-slate-950/60">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-14 h-11 flex-shrink-0">
            <CurrentHalo>
              <LessonStone status="current" size={70} />
            </CurrentHalo>
          </div>
          <div className="flex-1">
            <div className="font-bold">{current.title}</div>
            <div className="text-xs text-slate-500">{completedAny ? 'Up next' : 'Start here'}</div>
          </div>
        </div>
        {next && (
          <div className="flex items-center gap-3 mb-4 opacity-50">
            <LessonStone status="locked" size={56} />
            <div className="flex-1 text-slate-500 text-sm">{next.title}</div>
          </div>
        )}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-full bg-violet-500 text-white font-bold text-lg active:scale-95 transition-transform"
          style={{ boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.5)' }}
        >
          {completedAny ? 'Continue' : 'Start'}
        </button>
      </div>

      <BottomNav current={currentTab} onChange={onTabChange} />
    </div>
  );
}

// ============================================================
// COURSE MAP — vertical scroll of all levels & lessons
// ============================================================

function CourseScreen({ progress, onLessonTap, onBack, onTabChange, currentTab }) {
  const isCompleted = (id) => !!progress.completed[id];
  const isCurrent = (id) => id === progress.currentLessonId;

  // Determine which level is "current" (contains current lesson)
  const currentLevelId = COURSE.levels.find(lv =>
    lv.lessons.some(l => l.id === progress.currentLessonId)
  )?.id;

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <StatusBar />

      <div className="flex justify-between items-center px-5 pt-3 pb-2">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center">
          <ChevronLeft className="w-7 h-7" strokeWidth={2.2} />
        </button>
        <div className="w-10">
          <CMascot size={42} />
        </div>
        <button className="w-11 h-11 rounded-full border border-slate-700/80 flex items-center justify-center">
          <Zap className="w-5 h-5 text-slate-500" strokeWidth={1.8} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Header */}
        <div className="text-center mb-6">
          <CMascot size={120} />
          <h1 className="text-2xl font-extrabold mt-2">{COURSE.title}</h1>
          <p className="text-slate-500 text-sm leading-snug mt-3 px-6">{COURSE.description}</p>
          <div className="flex justify-center gap-7 mt-5 text-slate-200 text-sm">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span className="font-semibold">{TOTAL_LESSONS} Lessons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">⚡</span>
              <span className="font-semibold">{progress.totalXP} XP earned</span>
            </div>
          </div>
        </div>

        {COURSE.levels.map((level) => {
          const isCurrentLevel = level.id === currentLevelId;
          const hasAnyDone = level.lessons.some(l => isCompleted(l.id));
          const allDone = level.lessons.every(l => isCompleted(l.id));
          const isUnlocked = isCurrentLevel || hasAnyDone || level.id === 1;

          return (
            <div key={level.id} className="mb-6">
              {/* Level pill */}
              <div className={`rounded-2xl border-2 p-4 text-center mb-2 ${
                isCurrentLevel ? 'border-violet-500 bg-slate-950'
                  : 'border-slate-800 bg-slate-950/40'
              }`}>
                <div className={`text-xs font-bold tracking-widest ${
                  isCurrentLevel ? 'text-violet-400' : 'text-slate-600'
                }`}>LEVEL {level.id}</div>
                <div className={`text-lg font-bold mt-0.5 ${
                  isUnlocked ? 'text-white' : 'text-slate-500'
                }`}>{level.title}</div>
              </div>

              {/* Lessons — zig-zag layout */}
              <div className="py-2">
                {level.lessons.map((lesson, i) => {
                  const status = isCompleted(lesson.id) ? 'completed'
                    : isCurrent(lesson.id) ? 'current'
                    : 'locked';
                  const align = i % 2 === 0 ? 'justify-start pl-10' : 'justify-end pr-10';
                  const enabled = status !== 'locked';
                  return (
                    <div key={lesson.id} className={`flex items-center my-3 ${align}`}>
                      {i % 2 === 1 && (
                        <div className={`mr-3 text-right ${
                          status === 'locked' ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          {lesson.title}
                        </div>
                      )}
                      <button
                        onClick={() => enabled && onLessonTap(lesson.id)}
                        disabled={!enabled}
                        className={`relative ${enabled ? 'active:scale-95' : ''} transition-transform`}
                      >
                        {status === 'current' ? (
                          <CurrentHalo>
                            <LessonStone status={status} isReview={lesson.isReview} size={84} />
                          </CurrentHalo>
                        ) : (
                          <LessonStone status={status} isReview={lesson.isReview} size={84} />
                        )}
                      </button>
                      {i % 2 === 0 && (
                        <div className={`ml-3 ${
                          status === 'locked' ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          {lesson.title}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav current={currentTab} onChange={onTabChange} />
    </div>
  );
}

// ============================================================
// LESSON SCREEN — interactive fill-in-the-blank
// ============================================================

function LessonScreen({ lessonId, onClose, onComplete, progress, onAfterAsk }) {
  const data = EXERCISES[lessonId] || PLACEHOLDER_LESSON(
    COURSE.levels.flatMap(lv => lv.lessons).find(l => l.id === lessonId)?.title || 'Lesson'
  );
  const levelId = ALL_LESSONS.find(l => l.id === lessonId)?.level?.id;
  const fileName = fileNameFor(levelId);

  const [stepIdx, setStepIdx] = useState(0);
  const [tutorOpen, setTutorOpen] = useState(false);
  const resultsRef = useRef({}); // { itemId: { correct, firstTry } } — seeds SRS on complete

  const step = data.steps[stepIdx];
  const totalSteps = data.steps.length;

  const goNext = () => {
    if (stepIdx + 1 < totalSteps) setStepIdx(stepIdx + 1);
    else onComplete(resultsRef.current);
  };

  // First learning of a fill step is always rung 1 (scaffolded). The result is
  // recorded so the root can seed each item's spaced-review card.
  const handleStepResult = (res) => {
    resultsRef.current[`${lessonId}#${stepIdx}`] = { correct: res.correct, firstTry: res.firstTry };
    goNext();
  };

  const progressPct = (stepIdx / totalSteps) * 100;

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <StatusBar />
      {/* Top bar with X, progress, lightning */}
      <div className="flex items-center gap-4 px-5 pt-3 pb-4">
        <button onClick={onClose} className="w-9 h-9 flex items-center justify-center">
          <X className="w-7 h-7 text-slate-300" strokeWidth={2.2} />
        </button>
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex gap-1">
          {Array.from({ length: Math.min(totalSteps, 4) }).map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${
              i <= stepIdx ? 'bg-violet-400' : 'bg-slate-700'
            }`} />
          ))}
        </div>
        <button className="w-9 h-9 flex items-center justify-center">
          <Zap className="w-5 h-5 text-slate-500" strokeWidth={1.8} />
        </button>
      </div>

      {step.type === 'intro' ? (
        <>
          <div className="flex-1 overflow-y-auto px-5 pb-3">
            <div className="pt-6">
              <div className="flex justify-center mb-6">
                <CMascot size={140} />
              </div>
              <h2 className="text-2xl font-extrabold mb-4">{step.title}</h2>
              <p className="text-slate-300 text-base leading-relaxed">{step.body}</p>
            </div>
          </div>
          <div className="border-t bg-black border-slate-900 px-3 pt-3 pb-3 flex items-center gap-2">
            <button
              onClick={goNext}
              className="flex-1 h-12 rounded-full bg-violet-500 text-white font-bold text-base shadow-lg shadow-violet-900/50 active:scale-95"
            >
              Continue
            </button>
          </div>
        </>
      ) : (
        <FillCard
          key={stepIdx}
          step={step}
          itemId={`${lessonId}#${stepIdx}`}
          rung={1}
          review={false}
          fileName={fileName}
          onResult={handleStepResult}
          onAskTutor={() => setTutorOpen(true)}
        />
      )}

      {/* Tutor overlay */}
      <TutorPanel
        isOpen={tutorOpen}
        onClose={() => setTutorOpen(false)}
        lessonId={lessonId}
        lessonTitle={data.title}
        exerciseStep={step}
        currentBlanks={{}}
        progress={progress}
        onAfterAsk={onAfterAsk}
      />
    </div>
  );
}

// ============================================================
// DAILY REVIEW — spaced, interleaved retrieval session
// ============================================================
// Pulls due cards (built by buildReviewQueue: shuffled across levels, capped),
// tests each at the rung its maturity has earned, takes a confidence call for
// calibration, then ends with a reflection beat and an honest score. Rewards
// are contingent on actual recall, and the session is finite (wellbeing).
function ReviewScreen({ queue, progress, onClose, onComplete, onAfterAsk }) {
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState([]); // [{ itemId, correct, firstTry, confidence }]
  const [phase, setPhase] = useState('cards'); // 'cards' | 'reflect'
  const [reflection, setReflection] = useState('');
  const [tutorOpen, setTutorOpen] = useState(false);

  const total = queue.length;
  const current = queue[idx];
  const step = current ? fillStepFor(current.itemId) : null;
  const rung = current ? rungForBox(current.card.box) : 1;
  const fileName = current ? fileNameFor(current.levelId) : 'main.py';
  const correctCount = results.filter(r => r.correct).length;

  const finalize = (refl) => onComplete({ results, reflection: refl || '' });

  const handleResult = (res) => {
    const next = [...results, {
      itemId: current.itemId, correct: res.correct, firstTry: res.firstTry, confidence: res.confidence,
    }];
    setResults(next);
    if (idx + 1 < total) setIdx(idx + 1);
    else setPhase('reflect');
  };

  // Defensive: empty queue (caller guards on dueCount, but never crash).
  if (!current && phase === 'cards') {
    return (
      <div className="flex flex-col h-full bg-black text-white items-center justify-center px-8 text-center">
        <div className="text-5xl mb-3">✅</div>
        <h2 className="text-xl font-extrabold">You're all caught up.</h2>
        <p className="text-slate-400 text-sm mt-2">No cards are due right now — come back tomorrow.</p>
        <button onClick={onClose} className="mt-6 px-8 py-3 rounded-full bg-violet-500 font-bold">Done</button>
      </div>
    );
  }

  if (phase === 'reflect') {
    const sure = results.filter(r => r.confidence === 'sure');
    const sureHit = sure.filter(r => r.correct).length;
    return (
      <div className="flex flex-col h-full bg-black text-white">
        <StatusBar />
        <div className="flex-1 overflow-y-auto px-6 pt-8 pb-4">
          <div className="text-5xl text-center mb-3">🧠</div>
          <h2 className="text-2xl font-extrabold text-center">Review complete</h2>
          <p className="text-center text-slate-300 mt-2">
            You recalled <span className="font-bold text-emerald-300">{correctCount}</span> of {total}.
          </p>
          {sure.length > 0 && (
            <p className="text-center text-slate-500 text-sm mt-1">
              When you felt sure, you were right {Math.round((sureHit / sure.length) * 100)}% of the time.
            </p>
          )}
          <div className="mt-7">
            <div className="text-xs font-bold text-slate-500 tracking-wider mb-2">REFLECT (OPTIONAL)</div>
            <p className="text-sm text-slate-300 mb-3">One thing that clicked, or still feels fuzzy?</p>
            <textarea
              value={reflection}
              onChange={e => setReflection(e.target.value)}
              rows={3}
              placeholder="e.g. axis=0 collapses the rows…"
              className="w-full rounded-2xl bg-slate-950 border border-slate-800 p-3 text-sm text-slate-100 outline-none focus:border-violet-500 resize-none"
            />
          </div>
        </div>
        <div className="border-t border-slate-900 px-3 py-3 flex gap-2">
          <button onClick={() => finalize('')} className="px-5 h-12 rounded-full border border-slate-700 text-slate-300 font-bold active:scale-95">Skip</button>
          <button onClick={() => finalize(reflection.trim())} className="flex-1 h-12 rounded-full bg-violet-500 text-white font-bold active:scale-95">Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <StatusBar />
      <div className="flex items-center gap-4 px-5 pt-3 pb-3">
        <button onClick={() => finalize('')} className="w-9 h-9 flex items-center justify-center">
          <X className="w-7 h-7 text-slate-300" strokeWidth={2.2} />
        </button>
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-fuchsia-500 rounded-full transition-all duration-500" style={{ width: `${(idx / total) * 100}%` }} />
        </div>
        <div className="text-xs font-bold text-slate-400">{idx + 1}/{total}</div>
      </div>

      <div className="px-5 pb-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold tracking-wide text-fuchsia-300">DAILY REVIEW</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-500">{current.lessonTitle}</span>
        </div>
      </div>

      <FillCard
        key={current.itemId}
        step={step}
        itemId={current.itemId}
        rung={rung}
        review={true}
        fileName={fileName}
        onResult={handleResult}
        onAskTutor={() => setTutorOpen(true)}
      />

      <TutorPanel
        isOpen={tutorOpen}
        onClose={() => setTutorOpen(false)}
        lessonId={current.lessonId}
        lessonTitle={current.lessonTitle}
        exerciseStep={step}
        currentBlanks={{}}
        progress={progress}
        onAfterAsk={onAfterAsk}
      />
    </div>
  );
}

// ============================================================
// LESSON COMPLETE — quick celebration
// ============================================================

function LessonComplete({ reward, loot, celebration, streakBumped, streak, goalMet, newBadges, mascotName, onContinue }) {
  return (
    <div className="flex flex-col h-full bg-black text-white items-center justify-start px-6 pt-10 pb-6 overflow-y-auto">
      <div className="text-6xl mb-2">{reward.lucky ? '🎰' : '🎉'}</div>
      <h2 className="text-3xl font-extrabold text-center">{celebration}</h2>

      <div className="mt-5 px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-amber-300" />
        <div>
          <div className="text-2xl font-extrabold text-amber-300">+{reward.xp} XP</div>
          {(reward.lucky || reward.multiplied) && (
            <div className="text-xs text-amber-400 font-bold">
              {reward.lucky && '✨ LUCKY 2× '}
              {reward.multiplied && '🔥 BONUS DAY'}
            </div>
          )}
        </div>
      </div>

      {streakBumped && (
        <div className="mt-3 flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/15 border border-orange-500/40">
          <Flame className="w-5 h-5 text-orange-400" fill="#fb923c" />
          <span className="font-bold text-orange-300">{streak}-day streak!</span>
        </div>
      )}

      {goalMet && (
        <div className="mt-3 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/40">
          <Target className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-emerald-300">Daily goal hit!</span>
        </div>
      )}

      {loot && (
        <div className="mt-5 w-full max-w-xs">
          <LootBoxReveal loot={loot} />
        </div>
      )}

      {newBadges && newBadges.length > 0 && (
        <div className="mt-4 w-full max-w-xs space-y-2">
          {newBadges.map(b => (
            <div key={b.id} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-violet-500/10 border border-violet-500/30">
              <div className="text-3xl">{b.icon}</div>
              <div>
                <div className="text-xs text-violet-300 font-bold tracking-wider">NEW BADGE</div>
                <div className="font-bold">{b.name}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onContinue}
        className="mt-7 w-full max-w-xs py-3.5 rounded-full bg-violet-500 text-white font-bold text-lg active:scale-95"
        style={{ boxShadow: '0 10px 30px -5px rgba(124, 58, 237, 0.5)' }}
      >
        Continue
      </button>
      <p className="text-slate-600 text-sm mt-3">— {mascotName}</p>
    </div>
  );
}

// ============================================================
// PROFILE / "YOU" tab
// ============================================================

function YouScreen({ progress, onTabChange, currentTab, onReset, onOpenTutorStats }) {
  const completedCount = Object.keys(progress.completed).length;
  const earnedBadges = BADGE_DEFS.filter(b => progress.badges.includes(b.id));
  const lockedBadges = BADGE_DEFS.filter(b => !progress.badges.includes(b.id));
  const motivationObj = MOTIVATIONS.find(m => m.id === progress.motivation);
  const mastered = masteredLessonCount(progress);
  const due = dueCount(progress);
  const sureRate = calibrationRate(progress.calibration, 'sure');
  const shakyRate = calibrationRate(progress.calibration, 'shaky');

  // 14-day streak calendar
  const days = [];
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    days.push({ iso, day: d.getDate(), active: progress.activityDays.includes(iso) });
  }

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <StatusBar />
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 pt-4 pb-3">
          <h1 className="text-2xl font-extrabold">You</h1>
        </div>
        <div className="px-5">
          <div className="flex items-center gap-4 py-3">
            <div className="w-16 h-16 rounded-full bg-violet-500/20 border-2 border-violet-500 flex items-center justify-center text-3xl">
              🐍
            </div>
            <div className="flex-1">
              <div className="font-bold text-lg">{progress.mascotName || 'Tora'}'s student</div>
              {motivationObj && <div className="text-slate-500 text-sm">{motivationObj.label}</div>}
            </div>
            <StreakFlame count={progress.streak} size="lg" />
          </div>

          {/* Streak calendar */}
          <div className="mt-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="font-bold text-sm">Last 2 weeks</span>
              </div>
              <span className="text-xs text-slate-500">Best: {progress.longestStreak}</span>
            </div>
            <div className="flex justify-between gap-1">
              {days.map((d, i) => (
                <div key={i} className={`flex-1 aspect-square rounded-md flex items-center justify-center ${
                  d.active ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-600'
                }`}>
                  <span className="text-xs font-bold">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3 text-center">
              <div className="text-2xl font-extrabold text-violet-300">{completedCount}</div>
              <div className="text-xs text-slate-500 mt-0.5">Lessons</div>
            </div>
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3 text-center">
              <div className="text-2xl font-extrabold text-amber-300">{progress.totalXP}</div>
              <div className="text-xs text-slate-500 mt-0.5">Total XP</div>
            </div>
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3 text-center">
              <div className="text-2xl font-extrabold text-cyan-300">{progress.streakShields}</div>
              <div className="text-xs text-slate-500 mt-0.5">Shields</div>
            </div>
          </div>

          {/* Memory — durable retention, not just lessons clicked */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-fuchsia-300" />
              <span className="font-bold text-sm">Memory</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-2xl font-extrabold text-fuchsia-300">{mastered}<span className="text-sm text-slate-600"> / {TOTAL_LESSONS}</span></div>
                <div className="text-xs text-slate-500 mt-0.5">Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-extrabold text-cyan-300">{due}</div>
                <div className="text-xs text-slate-500 mt-0.5">Cards due</div>
              </div>
            </div>

            {(sureRate !== null || shakyRate !== null) && (
              <div className="mt-3 pt-3 border-t border-slate-800">
                <div className="text-xs font-bold text-slate-500 tracking-wider mb-2">CALIBRATION</div>
                <div className="space-y-1.5 text-sm">
                  {sureRate !== null && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">💪 Felt sure</span>
                      <span className="font-bold text-emerald-300">{sureRate}% right</span>
                    </div>
                  )}
                  {shakyRate !== null && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">🤔 Felt shaky</span>
                      <span className="font-bold text-amber-300">{shakyRate}% right</span>
                    </div>
                  )}
                </div>
                {sureRate !== null && sureRate < 80 && (
                  <p className="text-xs text-slate-500 mt-2 leading-snug">
                    Sure but missing? That's the illusion of fluency — spaced reviews close the gap.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Course progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 tracking-wider">COURSE PROGRESS</span>
              <span className="text-xs text-slate-500">{completedCount} / {TOTAL_LESSONS}</span>
            </div>
            <ProgressBar value={completedCount} max={TOTAL_LESSONS} color="violet" />
          </div>

          {/* Badges */}
          <div className="mt-6">
            <div className="text-xs font-bold text-slate-500 tracking-wider mb-3">
              BADGES — {earnedBadges.length} / {BADGE_DEFS.length}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {earnedBadges.map(b => (
                <div key={b.id} className="aspect-square rounded-2xl bg-violet-500/10 border border-violet-500/30 flex flex-col items-center justify-center p-2">
                  <div className="text-3xl">{b.icon}</div>
                  <div className="text-xs font-bold mt-1 text-center leading-tight">{b.name}</div>
                </div>
              ))}
              {lockedBadges.map(b => (
                <div key={b.id} className="aspect-square rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-2 opacity-40">
                  <div className="text-3xl grayscale">{b.icon}</div>
                  <div className="text-xs font-bold mt-1 text-center leading-tight text-slate-500">{b.name}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenTutorStats}
            className="mt-8 w-full py-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between px-4 active:bg-slate-900"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-violet-300" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm">Tutor Stats</div>
                <div className="text-xs text-slate-500">
                  {(progress.localServedCount || 0) + (progress.apiServedCount || 0)} questions handled · {(progress.promotedEntries || []).length} answers added
                </div>
              </div>
            </div>
            <ChevronLeft className="w-5 h-5 text-slate-500 rotate-180" />
          </button>

          <button
            onClick={onReset}
            className="mt-3 mb-4 w-full py-3 rounded-full border border-slate-800 text-slate-400 text-sm font-semibold active:bg-slate-900"
          >
            Reset all progress
          </button>
        </div>
      </div>
      <BottomNav current={currentTab} onChange={onTabChange} />
    </div>
  );
}

// ============================================================
// SHARED CHROME — status bar, bottom nav
// ============================================================

function StatusBar() {
  // Hide our fake status bar when running as an installed PWA — the OS
  // already shows the real one. Show it in browser preview / desktop.
  const [isStandalone, setIsStandalone] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia?.('(display-mode: standalone)');
    setIsStandalone(mql?.matches || window.navigator.standalone === true);
  }, []);
  if (isStandalone) return null;

  return (
    <div className="px-5 pt-2 pb-1 flex items-center justify-between text-sm font-medium">
      <div>{(() => {
        const d = new Date();
        const h = d.getHours();
        const m = d.getMinutes().toString().padStart(2, '0');
        return `${h}:${m}`;
      })()}</div>
      <div className="flex items-center gap-1.5 text-slate-300">
        <span className="text-xs">📶</span>
        <span className="text-xs">▮▮▮▯</span>
      </div>
    </div>
  );
}

function BottomNav({ current, onChange }) {
  const items = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'courses', label: 'Courses', Icon: BookOpen },
    { id: 'you', label: 'You', Icon: User },
  ];
  return (
    <div className="flex items-center justify-around py-3 border-t border-slate-900 bg-black">
      {items.map(({ id, label, Icon }) => {
        const active = id === current;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex flex-col items-center gap-1 px-6 py-1"
          >
            <div className={`px-4 py-1.5 rounded-full ${active ? 'bg-slate-800' : ''}`}>
              <Icon className={`w-6 h-6 ${active ? 'text-white' : 'text-slate-500'}`} strokeWidth={active ? 2.4 : 1.8} />
            </div>
            <span className={`text-xs font-semibold ${active ? 'text-white' : 'text-slate-500'}`}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// TUTOR PANEL — two-layer Q&A (local KB → API fallback)
// ============================================================

// Note: The web/PWA build is offline-only. The Claude API tutor is gone
// (it would need a backend with an API key — out of scope for the PWA).
// When the local KB doesn't match, we tell the user politely and log the
// unanswered question so they can review it later in Tutor Stats.

async function logUnansweredQuestion({ question, lessonContext }) {
  return {
    answer: "I don't have a quick answer to that one yet. I've saved your question — you can review it in Tutor Stats and add a local answer for next time.",
  };
}

function TutorPanel({
  isOpen, onClose, lessonId, lessonTitle, exerciseStep, currentBlanks, progress, onAfterAsk,
}) {
  const [messages, setMessages] = useState([]); // [{ role, content, source: 'local'|'api'|'user', entryId? }]
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  // Reset per lesson
  useEffect(() => {
    setMessages([]);
    setInput('');
    setError(null);
  }, [lessonId]);

  // Auto-scroll to newest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, pending]);

  // Build the lesson context for the API
  function buildLessonContext() {
    if (!exerciseStep) return { lessonTitle };
    if (exerciseStep.type !== 'fill') return { lessonTitle, prompt: exerciseStep.title };
    // Replay the code with current blanks filled in for context
    let blankIdx = 0;
    const codeWithBlanks = exerciseStep.code
      .map(line => line.replace(/___/g, () => {
        const v = currentBlanks?.[blankIdx];
        blankIdx++;
        return v !== undefined ? v : '___';
      }))
      .join('\n');
    return { lessonTitle, prompt: exerciseStep.prompt, codeWithBlanks };
  }

  async function ask(rawQuestion) {
    const question = rawQuestion.trim();
    if (!question || pending) return;
    setError(null);
    setMessages(m => [...m, { role: 'user', content: question, source: 'user' }]);
    setInput('');

    // Layer 1: try the local KB first, including any user-promoted entries
    const promoted = (progress.promotedEntries || []).map(e => ({
      ...e,
      keywords: e.keywords || [],
    }));
    const localCandidates = [
      ...promoted,
      ...(LESSON_FAQS[lessonId] || []),
      ...GLOSSARY,
    ];
    let best = null;
    for (const e of localCandidates) {
      const s = scoreEntryMatch(question, e);
      if (!best || s > best.score) best = { entry: e, score: s };
    }
    const localHit = best && best.score >= 3 ? best : null;

    if (localHit) {
      setMessages(m => [...m, {
        role: 'assistant',
        content: localHit.entry.answer,
        source: 'local',
        matchedQuestion: localHit.entry.question,
      }]);
      onAfterAsk({ servedBy: 'local' });
      return;
    }

    // Layer 2: no API in the PWA build. Save the question to the log
    // so the user can answer it themselves later via Tutor Stats.
    setPending(true);
    try {
      const lessonContext = buildLessonContext();
      const { answer } = await logUnansweredQuestion({ question, lessonContext });
      const logId = `q-${Date.now()}`;
      setMessages(m => [...m, {
        role: 'assistant',
        content: answer,
        source: 'unanswered',
        logId,
      }]);
      onAfterAsk({
        servedBy: 'unanswered',
        logEntry: {
          id: logId,
          question,
          answer,
          lessonId,
          lessonTitle,
          timestamp: Date.now(),
          localMatchPreview: best && best.score >= 1 ? best.entry.question : null,
          helpful: null,
        },
      });
    } catch (e) {
      setError("Couldn't save your question. Try again?");
    } finally {
      setPending(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col bg-black"
      style={{ animation: 'slide-up 0.25s ease-out' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-900">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
            <Sparkle className="w-4 h-4 text-violet-300" />
          </div>
          <div>
            <div className="font-bold text-sm">Tutor</div>
            <div className="text-xs text-slate-500">Ask about PyTorch concepts</div>
          </div>
        </div>
        <button onClick={onClose} className="w-9 h-9 flex items-center justify-center">
          <X className="w-6 h-6 text-slate-300" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="pt-2">
            <div className="text-sm text-slate-400 mb-3">
              Stuck? Ask a question about this lesson or any C concept.
            </div>
            <div className="flex flex-wrap gap-2">
              {GLOBAL_SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-sm text-slate-200 active:scale-95"
                >
                  {s}
                </button>
              ))}
            </div>
            {(LESSON_FAQS[lessonId] || []).length > 0 && (
              <div className="mt-5">
                <div className="text-xs font-bold text-slate-500 tracking-wider mb-2">
                  COMMON IN THIS LESSON
                </div>
                <div className="space-y-1.5">
                  {(LESSON_FAQS[lessonId] || []).map((f, i) => (
                    <button
                      key={i}
                      onClick={() => ask(f.question)}
                      className="w-full text-left px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 active:scale-[0.98]"
                    >
                      <div className="text-sm text-slate-200">{f.question}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {messages.map((m, i) => {
          if (m.role === 'user') {
            return (
              <div key={i} className="flex justify-end">
                <div className="max-w-xs px-3.5 py-2.5 rounded-2xl bg-violet-500 text-white text-sm">
                  {m.content}
                </div>
              </div>
            );
          }
          // Assistant
          return (
            <div key={i} className="flex justify-start">
              <div className="max-w-sm">
                <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.source === 'unanswered'
                    ? 'bg-amber-950/40 border border-amber-700/40 text-slate-100'
                    : 'bg-slate-900 border border-slate-800 text-slate-100'
                }`}>
                  {m.source === 'unanswered' && (
                    <div className="flex items-center gap-1 text-xs font-bold tracking-wider text-amber-300 mb-1.5">
                      <Sparkle className="w-3 h-3" />
                      <span>SAVED FOR LATER</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{m.content}</div>
                </div>
                {m.source === 'local' && (
                  <div className="text-xs text-slate-600 mt-1 ml-1">
                    Quick answer · Still confused? Ask a follow-up.
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {pending && (
          <div className="flex justify-start">
            <div className="px-3.5 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2">
              <Sparkle className="w-3.5 h-3.5 text-slate-400 animate-pulse-halo" />
              <span className="text-sm text-slate-300">Saving your question…</span>
            </div>
          </div>
        )}

        {error && (
          <div className="px-3 py-2 rounded-xl bg-rose-950/50 border border-rose-700 text-sm text-rose-300">
            {error}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-900 px-3 py-3">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') ask(input); }}
            placeholder="Ask about this lesson…"
            className="flex-1 bg-transparent text-white text-sm outline-none py-2 placeholder-slate-500"
          />
          <button
            onClick={() => ask(input)}
            disabled={!input.trim() || pending}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              input.trim() && !pending ? 'bg-violet-500 text-white active:scale-95' : 'bg-slate-800 text-slate-600'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-slate-600 mt-1.5 text-center px-2">
          Offline tutor · Unmatched questions get saved for later.
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ONBOARDING — internal trigger + investment + endowed progress
// ============================================================

function OnboardingScreen({ onFinish }) {
  const [step, setStep] = useState(0);
  const [motivation, setMotivation] = useState(null);
  const [dailyGoal, setDailyGoal] = useState(1);
  const [reminderTime, setReminderTime] = useState('19:00');
  const [mascotName, setMascotName] = useState('Tora');

  const next = () => setStep(step + 1);
  const back = () => setStep(Math.max(0, step - 1));
  const motivationObj = MOTIVATIONS.find(m => m.id === motivation);

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <StatusBar />
      <div className="px-5 pt-2 pb-1 flex items-center gap-2">
        {step > 0 && (
          <button onClick={back} className="w-9 h-9 flex items-center justify-center">
            <ChevronLeft className="w-6 h-6 text-slate-400" />
          </button>
        )}
        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-violet-500 rounded-full transition-all duration-500" style={{ width: `${((step + 1) / 5) * 100}%` }} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-3">
        {step === 0 && (
          <div className="pt-4">
            <div className="flex justify-center mb-2"><CMascot size={170} /></div>
            <h1 className="text-3xl font-extrabold text-center">Welcome.</h1>
            <p className="text-slate-300 text-center mt-3 leading-relaxed">
              I'll drill the syntax of Python, NumPy, and PyTorch — tensors, autograd, models, the training loop. Real patterns, in context, no fluff.
            </p>
            <p className="text-slate-500 text-center mt-4 text-sm">
              Takes a couple minutes to set up. Then 5 minutes a day is enough.
            </p>
          </div>
        )}
        {step === 1 && (
          <div className="pt-4">
            <h2 className="text-2xl font-extrabold">Why are you here?</h2>
            <p className="text-slate-400 mt-2 leading-snug">Pick what fits — we'll tune the experience around it.</p>
            <div className="space-y-2.5 mt-6">
              {MOTIVATIONS.map(m => (
                <button
                  key={m.id}
                  onClick={() => setMotivation(m.id)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    motivation === m.id ? 'border-violet-500 bg-violet-500/10' : 'border-slate-800 bg-slate-950'
                  }`}
                >
                  <div className="font-bold">{m.label}</div>
                  <div className="text-sm text-slate-400 mt-0.5">{m.sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="pt-4">
            <h2 className="text-2xl font-extrabold">Set a daily goal.</h2>
            <p className="text-slate-400 mt-2 leading-snug">
              How many lessons per day? Be honest — small and consistent beats big and inconsistent.
            </p>
            <div className="space-y-2.5 mt-6">
              {[
                { n: 1, label: 'Casual', sub: '1 lesson — about 3 minutes' },
                { n: 3, label: 'Regular', sub: '3 lessons — about 10 minutes' },
                { n: 5, label: 'Intense', sub: '5 lessons — about 15 minutes' },
                { n: 10, label: 'Insane', sub: '10 lessons — about 30 minutes' },
              ].map(g => (
                <button
                  key={g.n}
                  onClick={() => setDailyGoal(g.n)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                    dailyGoal === g.n ? 'border-violet-500 bg-violet-500/10' : 'border-slate-800 bg-slate-950'
                  }`}
                >
                  <Target className={`w-5 h-5 ${dailyGoal === g.n ? 'text-violet-400' : 'text-slate-500'}`} />
                  <div className="flex-1">
                    <div className="font-bold">{g.label}</div>
                    <div className="text-sm text-slate-400">{g.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="pt-4">
            <h2 className="text-2xl font-extrabold">When should I check in?</h2>
            <p className="text-slate-400 mt-2 leading-snug">Pick a time when you usually have a few minutes free.</p>
            <div className="grid grid-cols-2 gap-2.5 mt-6">
              {[
                { t: '07:00', label: 'Morning', sub: '7:00 AM' },
                { t: '12:00', label: 'Lunch', sub: '12:00 PM' },
                { t: '17:00', label: 'Commute', sub: '5:00 PM' },
                { t: '19:00', label: 'Evening', sub: '7:00 PM' },
                { t: '21:00', label: 'Before bed', sub: '9:00 PM' },
                { t: '22:30', label: 'Late', sub: '10:30 PM' },
              ].map(t => (
                <button
                  key={t.t}
                  onClick={() => setReminderTime(t.t)}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    reminderTime === t.t ? 'border-violet-500 bg-violet-500/10' : 'border-slate-800 bg-slate-950'
                  }`}
                >
                  <Clock className={`w-5 h-5 mx-auto mb-1.5 ${reminderTime === t.t ? 'text-violet-400' : 'text-slate-500'}`} />
                  <div className="font-bold text-sm">{t.label}</div>
                  <div className="text-xs text-slate-400">{t.sub}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-600 mt-4 text-center">You can change this later.</p>
          </div>
        )}
        {step === 4 && (
          <div className="pt-2">
            <div className="flex justify-center"><CMascot size={120} /></div>
            <h2 className="text-2xl font-extrabold text-center mt-1">Name your mascot.</h2>
            <p className="text-slate-400 mt-2 leading-snug text-center">They'll be your study buddy.</p>
            <input
              value={mascotName}
              onChange={e => setMascotName(e.target.value.slice(0, 20))}
              className="mt-5 w-full bg-slate-900 border-2 border-slate-800 rounded-2xl px-4 py-3 text-center text-xl font-bold text-white outline-none"
              style={{ caretColor: '#a855f7' }}
            />
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              {['Tora', 'Grad', 'Nimbus', 'Tensor', 'Adam', 'Relu'].map(n => (
                <button
                  key={n}
                  onClick={() => setMascotName(n)}
                  className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-300 active:scale-95"
                >
                  {n}
                </button>
              ))}
            </div>
            {motivationObj && (
              <div className="mt-6 p-4 rounded-2xl bg-violet-500/10 border border-violet-500/30">
                <div className="text-xs text-violet-300 font-bold tracking-wider mb-1.5">YOUR PLAN</div>
                <div className="text-sm text-slate-200">
                  <span className="font-semibold">{mascotName}</span> will help you reach your <span className="font-semibold">{motivationObj.label.toLowerCase()}</span> goal — <span className="font-semibold">{dailyGoal} lesson{dailyGoal > 1 ? 's' : ''} a day</span>, around <span className="font-semibold">{reminderTime}</span>.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="px-5 py-4 border-t border-slate-900">
        <button
          onClick={() => step === 4 ? onFinish({ motivation, dailyGoal, reminderTime, mascotName: mascotName || 'Tora' }) : next()}
          disabled={step === 1 && !motivation}
          className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
            (step === 1 && !motivation) ? 'bg-slate-800 text-slate-600' : 'bg-violet-500 text-white active:scale-95'
          }`}
          style={{ boxShadow: (step === 1 && !motivation) ? 'none' : '0 10px 30px -5px rgba(124, 58, 237, 0.5)' }}
        >
          {step === 4 ? "Let's go" : 'Continue'}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// TUTOR STATS — review API questions, cluster, promote to local
// ============================================================

// Group similar questions using lowercase token-set similarity
function clusterQuestions(log) {
  if (!log || log.length === 0) return [];

  function tokens(q) {
    return new Set(
      q.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(t => t.length > 2 && !STOP_WORDS.has(t))
    );
  }
  function jaccard(a, b) {
    if (a.size === 0 || b.size === 0) return 0;
    let inter = 0;
    for (const t of a) if (b.has(t)) inter++;
    return inter / (a.size + b.size - inter);
  }

  const items = log.map(e => ({ entry: e, tokens: tokens(e.question) }));
  const used = new Set();
  const clusters = [];
  for (let i = 0; i < items.length; i++) {
    if (used.has(i)) continue;
    const cluster = [items[i].entry];
    used.add(i);
    for (let j = i + 1; j < items.length; j++) {
      if (used.has(j)) continue;
      if (jaccard(items[i].tokens, items[j].tokens) >= 0.5) {
        cluster.push(items[j].entry);
        used.add(j);
      }
    }
    clusters.push(cluster);
  }
  // Sort clusters by frequency (size) then most-recent first
  clusters.sort((a, b) => {
    if (b.length !== a.length) return b.length - a.length;
    return b[0].timestamp - a[0].timestamp;
  });
  return clusters;
}

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'this', 'that', 'what', 'why', 'how', 'when', 'where',
  'does', 'doesn', 'don', 'can', 'should', 'would', 'could', 'will', 'are', 'was',
  'were', 'have', 'has', 'had', 'but', 'not', 'you', 'your', 'use', 'used', 'using',
  'into', 'onto', 'from', 'about', 'just', 'really', 'mean', 'means',
]);

function relativeTime(ms) {
  const diff = Date.now() - ms;
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(ms).toLocaleDateString();
}

// Editor for promoting an API question into a local KB entry
function PromoteEditor({ initial, onSave, onCancel }) {
  const [keywords, setKeywords] = useState(initial.keywords || '');
  const [question, setQuestion] = useState(initial.question || '');
  const [answer, setAnswer] = useState(initial.answer || '');
  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-bold text-slate-500 tracking-wider">QUESTION</label>
        <input
          value={question}
          onChange={e => setQuestion(e.target.value)}
          className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none"
        />
      </div>
      <div>
        <label className="text-xs font-bold text-slate-500 tracking-wider">KEYWORDS (comma-separated)</label>
        <input
          value={keywords}
          onChange={e => setKeywords(e.target.value)}
          className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none font-mono"
        />
        <p className="text-xs text-slate-600 mt-1">
          Add 3-6 distinctive words. Future questions matching these will use this entry.
        </p>
      </div>
      <div>
        <label className="text-xs font-bold text-slate-500 tracking-wider">ANSWER</label>
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          rows={6}
          className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none resize-none"
        />
      </div>
      <div className="flex gap-2 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-full border border-slate-700 text-slate-300 text-sm font-bold"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            const kws = keywords.split(',').map(s => s.trim()).filter(Boolean);
            if (kws.length === 0 || !question.trim() || !answer.trim()) return;
            onSave({ keywords: kws, question: question.trim(), answer: answer.trim() });
          }}
          className="flex-1 py-2.5 rounded-full bg-violet-500 text-white text-sm font-bold"
        >
          Save to local KB
        </button>
      </div>
    </div>
  );
}

function TutorStatsPanel({ progress, onBack, onPromote, onDeleteLog, onDeletePromoted }) {
  const [tab, setTab] = useState('api'); // 'api' | 'promoted' | 'usage'
  const [editing, setEditing] = useState(null); // { logId, question, answer, keywords }

  const log = progress.apiQuestionLog || [];
  const clusters = clusterQuestions(log);
  const promoted = progress.promotedEntries || [];
  const localCount = progress.localServedCount || 0;
  const apiCount = progress.apiServedCount || 0;
  const total = localCount + apiCount;
  const localPct = total > 0 ? Math.round((localCount / total) * 100) : 0;

  function startPromote(entry) {
    // Suggest keywords from the question (top 4 distinctive words)
    const suggested = entry.question
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 3 && !STOP_WORDS.has(w))
      .slice(0, 4)
      .join(', ');
    setEditing({
      logId: entry.id,
      question: entry.question,
      answer: '', // user fills this in (no API answer to seed it)
      keywords: suggested,
    });
  }

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <StatusBar />
      <div className="flex items-center px-4 pt-3 pb-2 gap-2">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-extrabold flex-1">Tutor Stats</h1>
        <BarChart3 className="w-5 h-5 text-violet-400" />
      </div>

      {/* Usage summary */}
      <div className="mx-4 mb-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 tracking-wider">USAGE</span>
          <span className="text-xs text-slate-500">{total} questions handled</span>
        </div>
        <div className="flex h-2 rounded-full overflow-hidden bg-slate-800">
          <div className="bg-violet-500" style={{ width: `${localPct}%` }} />
          <div className="bg-amber-700" style={{ width: `${100 - localPct}%` }} />
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span className="text-violet-300 font-semibold">Answered: {localCount}</span>
          <span className="text-amber-300 font-semibold">Unanswered: {apiCount}</span>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="px-4 mb-3 flex gap-2">
        {[
          { id: 'api', label: `Unanswered (${log.length})` },
          { id: 'promoted', label: `Local (${promoted.length})` },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 rounded-full text-sm font-bold ${
              tab === t.id ? 'bg-violet-500 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {tab === 'api' && (
          <>
            {clusters.length === 0 ? (
              <div className="text-center text-slate-500 text-sm py-12 px-6">
                No unanswered questions yet. When students ask something the local KB doesn't cover, it shows up here so you can write an answer for next time.
              </div>
            ) : (
              <div className="space-y-2">
                {clusters.map((cluster, ci) => {
                  const head = cluster[0];
                  return (
                    <div key={head.id} className="rounded-2xl bg-slate-950 border border-slate-800 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-slate-100 leading-snug">
                            {head.question}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {cluster.length > 1 && (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-violet-500/15 text-violet-300 font-bold">
                                ×{cluster.length}
                              </span>
                            )}
                            <span className="text-xs text-slate-500">{head.lessonTitle}</span>
                            <span className="text-xs text-slate-600">{relativeTime(head.timestamp)}</span>
                            {head.promoted && (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-bold">
                                ✓ Local
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <details className="mt-2">
                        <summary className="text-xs text-violet-300 cursor-pointer">View answer</summary>
                        <div className="mt-2 px-3 py-2 rounded-xl bg-slate-900 text-sm text-slate-200 whitespace-pre-wrap">
                          {head.answer}
                        </div>
                        {cluster.length > 1 && (
                          <div className="mt-2">
                            <div className="text-xs font-bold text-slate-500 tracking-wider mb-1">
                              SIMILAR QUESTIONS IN THIS CLUSTER
                            </div>
                            <div className="space-y-1">
                              {cluster.slice(1).map(c => (
                                <div key={c.id} className="text-xs text-slate-400">• {c.question}</div>
                              ))}
                            </div>
                          </div>
                        )}
                      </details>
                      {!head.promoted && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => startPromote(head)}
                            className="flex-1 py-2 rounded-full bg-violet-500/15 border border-violet-500/40 text-violet-300 text-xs font-bold flex items-center justify-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add answer
                          </button>
                          <button
                            onClick={() => onDeleteLog(head.id)}
                            className="px-3 py-2 rounded-full border border-slate-800 text-slate-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {tab === 'promoted' && (
          <>
            {promoted.length === 0 ? (
              <div className="text-center text-slate-500 text-sm py-12 px-6">
                No promoted entries yet. Tap "Add answer" on any unanswered question to add a local answer for next time.
              </div>
            ) : (
              <div className="space-y-2">
                {promoted.map(p => (
                  <div key={p.sourceQuestionId} className="rounded-2xl bg-slate-950 border border-emerald-700/30 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-slate-100 leading-snug">{p.question}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {p.keywords.map(k => (
                            <span key={k} className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                              {k}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => onDeletePromoted(p.sourceQuestionId)}
                        className="px-2 py-1.5 rounded-lg border border-slate-800 text-slate-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <details className="mt-2">
                      <summary className="text-xs text-emerald-300 cursor-pointer">View answer</summary>
                      <div className="mt-2 px-3 py-2 rounded-xl bg-slate-900 text-sm text-slate-200 whitespace-pre-wrap">
                        {p.answer}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-end" onClick={() => setEditing(null)}>
          <div
            className="w-full bg-slate-950 border-t border-slate-700 rounded-t-3xl p-4 overflow-y-auto"
            style={{ maxHeight: '90%' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-extrabold">Promote to Local KB</h2>
              <button onClick={() => setEditing(null)} className="w-9 h-9 flex items-center justify-center">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <PromoteEditor
              initial={editing}
              onCancel={() => setEditing(null)}
              onSave={(data) => {
                onPromote({ logId: editing.logId, ...data });
                setEditing(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}



export default function ThinkingInC() {
  const [view, setView] = useState('home');
  const [tab, setTab] = useState('home');
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [progress, setProgress] = useState(defaultProgress());
  const [hydrated, setHydrated] = useState(false);
  const [completionData, setCompletionData] = useState(null);
  const [reviewQueue, setReviewQueue] = useState([]);

  useEffect(() => {
    let cancelled = false;
    loadProgress().then(p => {
      if (!cancelled) {
        const rolled = rolloverIfNeeded(p);
        setProgress(rolled);
        setHydrated(true);
        if (rolled !== p) saveProgress(rolled);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const handleStart = () => {
    setActiveLessonId(progress.currentLessonId);
    setView('lesson');
  };

  const handleLessonTap = (id) => {
    setActiveLessonId(id);
    setView('lesson');
  };

  const handleComplete = async (results) => {
    const idx = ALL_LESSONS.findIndex(l => l.id === activeLessonId);
    const nextLesson = ALL_LESSONS[idx + 1];
    const reward = rollLessonReward(progress);

    let updated = { ...progress };
    if (!updated.completed[activeLessonId]) {
      updated.completed = { ...updated.completed, [activeLessonId]: { date: todayISO(), xp: reward.xp } };
    }
    updated.totalXP = updated.totalXP + reward.xp;
    updated.todayLessons = updated.todayLessons + 1;

    const today = todayISO();
    if (!updated.activityDays.includes(today)) {
      updated.activityDays = [...updated.activityDays, today].slice(-90);
    }

    const beforeLastDate = updated.lastActiveDate;
    updated = applyStreak(updated);
    const streakBumped = beforeLastDate !== today;

    const goalJustMet = updated.todayLessons === updated.dailyGoal;

    if (nextLesson) updated.currentLessonId = nextLesson.id;

    const completedCount = Object.keys(updated.completed).length;
    let loot = null;
    if (shouldGetLoot(completedCount)) {
      loot = pickLoot();
      if (loot.type === 'xp') {
        updated.totalXP += loot.amount;
      } else if (loot.type === 'shield') {
        updated.streakShields = updated.streakShields + loot.amount;
      } else if (loot.type === 'multiplier') {
        const tmrw = new Date();
        tmrw.setDate(tmrw.getDate() + 1);
        updated.multiplierActiveOn = `${tmrw.getFullYear()}-${String(tmrw.getMonth() + 1).padStart(2, '0')}-${String(tmrw.getDate()).padStart(2, '0')}`;
      }
    }

    const newBadgeIds = newlyEarnedBadges(updated);
    if (newBadgeIds.length > 0) {
      updated.badges = [...updated.badges, ...newBadgeIds];
    }
    // Seed a spaced-review card for each fill step learned this session.
    // (seedCardOnLearn keeps an existing card's maturity if the lesson is replayed.)
    let srs = { ...(updated.srs || {}) };
    Object.entries(results || {}).forEach(([itemId, r]) => {
      srs = seedCardOnLearn(srs, itemId, r.firstTry);
    });
    updated.srs = srs;

    const newBadgeObjs = BADGE_DEFS.filter(b => newBadgeIds.includes(b.id));

    setProgress(updated);
    await saveProgress(updated);

    setCompletionData({
      reward, loot,
      celebration: pickCelebration(),
      streakBumped, streak: updated.streak,
      goalMet: goalJustMet,
      newBadges: newBadgeObjs,
    });
    setView('complete');
  };

  const handleCompleteDone = () => {
    setCompletionData(null);
    setView('home');
    setTab('home');
  };

  const handleStartReview = () => {
    const queue = buildReviewQueue(progress);
    if (queue.length === 0) return;
    setReviewQueue(queue);
    setView('review');
  };

  const handleReviewComplete = async ({ results, reflection }) => {
    let updated = { ...progress };
    const srs = { ...(updated.srs || {}) };
    const cal = { ...(updated.calibration || { sureCorrect: 0, sureTotal: 0, shakyCorrect: 0, shakyTotal: 0 }) };
    let recalled = 0;
    (results || []).forEach(r => {
      srs[r.itemId] = gradeCard(srs[r.itemId], r.correct, r.firstTry);
      if (r.correct) recalled++;
      if (r.confidence === 'sure') { cal.sureTotal++; if (r.correct) cal.sureCorrect++; }
      else if (r.confidence === 'shaky') { cal.shakyTotal++; if (r.correct) cal.shakyCorrect++; }
    });
    updated.srs = srs;
    updated.calibration = cal;
    updated.reviewsToday = (updated.reviewsToday || 0) + (results || []).length;
    updated.reviewsCompleted = (updated.reviewsCompleted || 0) + 1;
    // XP is contingent on actual recall — never on merely showing up.
    updated.totalXP = updated.totalXP + recalled * 3;

    if (reflection) {
      updated.reflections = [{ date: todayISO(), text: reflection }, ...(updated.reflections || [])].slice(0, 50);
    }

    // A review counts as a real day of practice — it protects the streak.
    const today = todayISO();
    if (!updated.activityDays.includes(today)) {
      updated.activityDays = [...updated.activityDays, today].slice(-90);
    }
    updated = applyStreak(updated);

    const newBadgeIds = newlyEarnedBadges(updated);
    if (newBadgeIds.length > 0) updated.badges = [...updated.badges, ...newBadgeIds];

    setProgress(updated);
    await saveProgress(updated);
    setReviewQueue([]);
    setView('home');
    setTab('home');
  };

  const handleTabChange = (id) => {
    setTab(id);
    if (id === 'home') setView('home');
    if (id === 'courses') setView('courses');
    if (id === 'you') setView('you');
  };

  const handleTutorAsk = async ({ servedBy, logEntry }) => {
    let updated = { ...progress };
    if (servedBy === 'local') {
      updated.localServedCount = (updated.localServedCount || 0) + 1;
    } else if (servedBy === 'unanswered') {
      updated.apiServedCount = (updated.apiServedCount || 0) + 1;
      if (logEntry) {
        const newLog = [logEntry, ...(updated.apiQuestionLog || [])].slice(0, 200);
        updated.apiQuestionLog = newLog;
      }
    }
    setProgress(updated);
    await saveProgress(updated);
  };

  const handlePromoteEntry = async ({ logId, keywords, question, answer }) => {
    const updated = { ...progress };
    updated.promotedEntries = [
      { keywords: keywords.map(k => k.toLowerCase()), question, answer, sourceQuestionId: logId },
      ...(updated.promotedEntries || []),
    ];
    // Mark the source log entry so the panel shows it was promoted
    updated.apiQuestionLog = (updated.apiQuestionLog || []).map(e =>
      e.id === logId ? { ...e, promoted: true } : e
    );
    setProgress(updated);
    await saveProgress(updated);
  };

  const handleDeleteLogEntry = async (logId) => {
    const updated = {
      ...progress,
      apiQuestionLog: (progress.apiQuestionLog || []).filter(e => e.id !== logId),
    };
    setProgress(updated);
    await saveProgress(updated);
  };

  const handleDeletePromoted = async (sourceQuestionId) => {
    const updated = {
      ...progress,
      promotedEntries: (progress.promotedEntries || []).filter(e => e.sourceQuestionId !== sourceQuestionId),
    };
    setProgress(updated);
    await saveProgress(updated);
  };

  const handleReset = async () => {
    const fresh = defaultProgress();
    fresh.onboarded = true;
    fresh.mascotName = progress.mascotName;
    fresh.motivation = progress.motivation;
    fresh.dailyGoal = progress.dailyGoal;
    fresh.reminderTime = progress.reminderTime;
    setProgress(fresh);
    await saveProgress(fresh);
  };

  const handleOnboardFinish = async (data) => {
    // Endowed-progress: start the user with a head start (5 XP, 1 shield, day-1 streak)
    const fresh = {
      ...defaultProgress(),
      onboarded: true,
      mascotName: data.mascotName,
      motivation: data.motivation,
      dailyGoal: data.dailyGoal,
      reminderTime: data.reminderTime,
      activityDays: [todayISO()],
      streak: 1,
      longestStreak: 1,
      lastActiveDate: todayISO(),
      todayLessons: 0,
      totalXP: 5,
      streakShields: 1,
    };
    setProgress(fresh);
    await saveProgress(fresh);
    setView('home');
    setTab('home');
  };

  return (
    <>
      <style>{`
        @keyframes pulse-halo {
          0%, 100% { opacity: 0.55; transform: scale(1.4); }
          50% { opacity: 0.9; transform: scale(1.55); }
        }
        @keyframes blink {
          0%, 50% { border-color: rgb(167 139 250); }
          51%, 100% { border-color: rgba(167, 139, 250, 0.3); }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <div
        className="w-full md:flex md:items-center md:justify-center md:p-4"
        style={{
          minHeight: '100dvh',
          background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0a0a0a 60%)',
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {/* Desktop frame styling — applied via class and media query */}
        <style>{`
          .phone-frame {
            width: 100%;
            height: 100dvh;
            background: #000;
            position: relative;
            overflow: hidden;
          }
          @media (min-width: 768px) {
            .phone-frame {
              max-width: 400px;
              height: min(820px, calc(100dvh - 32px));
              border-radius: 44px;
              box-shadow: 0 25px 50px -12px rgba(124, 58, 237, 0.35), 0 0 0 1px rgb(30 41 59);
            }
          }
        `}</style>
        <div className="phone-frame">
          {!hydrated ? (
            <div className="flex flex-col h-full items-center justify-center bg-black text-slate-500">
              <CMascot size={120} />
              <div className="mt-3 text-sm">Loading…</div>
            </div>
          ) : !progress.onboarded ? (
            <OnboardingScreen onFinish={handleOnboardFinish} />
          ) : (
            <>
              {view === 'home' && (
                <HomeScreen
                  progress={progress}
                  onStart={handleStart}
                  onStartReview={handleStartReview}
                  onTabChange={handleTabChange}
                  currentTab={tab}
                />
              )}
              {view === 'courses' && (
                <CourseScreen
                  progress={progress}
                  onLessonTap={handleLessonTap}
                  onBack={() => { setView('home'); setTab('home'); }}
                  onTabChange={handleTabChange}
                  currentTab={tab}
                />
              )}
              {view === 'lesson' && (
                <LessonScreen
                  lessonId={activeLessonId}
                  onClose={() => { setView('home'); setTab('home'); }}
                  onComplete={handleComplete}
                  progress={progress}
                  onAfterAsk={handleTutorAsk}
                />
              )}
              {view === 'review' && (
                <ReviewScreen
                  queue={reviewQueue}
                  progress={progress}
                  onClose={() => { setView('home'); setTab('home'); }}
                  onComplete={handleReviewComplete}
                  onAfterAsk={handleTutorAsk}
                />
              )}
              {view === 'complete' && completionData && (
                <LessonComplete
                  {...completionData}
                  mascotName={progress.mascotName}
                  onContinue={handleCompleteDone}
                />
              )}
              {view === 'you' && (
                <YouScreen
                  progress={progress}
                  onTabChange={handleTabChange}
                  currentTab={tab}
                  onReset={handleReset}
                  onOpenTutorStats={() => setView('tutor-stats')}
                />
              )}
              {view === 'tutor-stats' && (
                <TutorStatsPanel
                  progress={progress}
                  onBack={() => { setView('you'); setTab('you'); }}
                  onPromote={handlePromoteEntry}
                  onDeleteLog={handleDeleteLogEntry}
                  onDeletePromoted={handleDeletePromoted}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
