import matplotlib.pyplot as plt
import numpy as np
import os

# Sometimes not saving to right spot
python_dir = os.path.dirname(os.path.abspath(__file__))
output_path = os.path.join(python_dir, 'sus_figure.png')

# Data for the bars
x = np.arange(1, 11)
y1 = np.array([85, 87.5, 95, 77.5, 85, 82.5, 85, 97.5, 95, 92.5])
y2 = np.array([85, 72.5, 57.5, 72.5, 62.5, 77.5, 82.5, 92.5, 77.5, 70])

# Set target width in pixels and DPI
dpi = 100
fig_width_px = 700
fig_width_in = fig_width_px / dpi

# Create correct fig size
fig, ax = plt.subplots(figsize=(fig_width_in, fig_width_in*8/16), dpi=dpi)

# Create the bars
width = 0.35  # Bar width
ax.bar(x - width/2, y1, width, label='Easy', color='#89CFF0')
ax.bar(x + width/2, y2, width, label='Hard', color='#0047AB')

ax.axhline(y=68, color='#212f3d', linestyle='--', linewidth=1.5, alpha=0.8)

# Set the y-axis limits
ax.set_ylim(0, 100)

# Set the x-axis and y-axis labels
ax.set_xlabel('Participant')
ax.set_ylabel('System Usability Score')

# Set the x and y-ticks
ax.set_xticks(x)
ax.set_xticklabels([f'{i}' for i in x])
ax.set_yticks(np.arange(0, 101, 10))

# Add dotted horizontal lines every 10 y
ax.grid(which='major', axis='y', linestyle=':', color='gray', alpha=0.7)

# Add legend
ax.legend(loc='upper left', bbox_to_anchor=(1.05, 1), borderaxespad=0)

# Show the plot
plt.title('System Usability Score by Participant')
plt.tight_layout()
plt.savefig(output_path, dpi=300)
# plt.show()
