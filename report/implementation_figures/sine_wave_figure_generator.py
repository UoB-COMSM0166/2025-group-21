import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation, PillowWriter
import os

# Sometimes not saving to right spot
python_dir = os.path.dirname(os.path.abspath(__file__))
output_path = os.path.join(python_dir, 'sine_wave_figure.gif')

print(f"Saving GIF to: {output_path}")

# Set Arial if available
plt.rcParams['font.family'] = 'Arial'

# Constants based on user input
fps = 60  # Frames per second
frames = 480  # Total number of frames
x = np.linspace(0, 2 * np.pi, 1000)  # x values for the sine wave

# Sine wave functions based on user input
def sine1(x):
    return np.sin(x)

def sine2(x):
    return 2 * np.sin(0.5 * x + 0.5)

def sine3(x):
    return 1.5 * np.sin(2 * x + 1)

# Sum of the waves
def sine_sum(x):
    return sine1(x) + sine2(x) + sine3(x)

# Set up the plot with 2 subplots (one for individual waves, one for sum)
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10.24, 4.2), sharex=True)

# Set the limits and labels
ax1.set_xlim(0, 2 * np.pi)
ax1.set_ylim(-5, 5)
ax1.set_title("Individual Sine Waves", fontsize=14, loc='left', weight='bold', pad=20)
ax1.set_ylabel("Amplitude")

ax2.set_xlim(0, 2 * np.pi)
ax2.set_ylim(-5, 5)
ax2.set_title("Sum of Sine Waves", fontsize=14, loc='left', weight='bold', pad=20)
ax2.set_xlabel("x")
ax2.set_ylabel("Amplitude")

# Remove axis, grid, and borders
for ax in [ax1, ax2]:
    ax.axis('off')  # Turn off the axis and the border
    ax.set_xticks([])  # Remove x ticks
    ax.set_yticks([])  # Remove y ticks

# Set up the plot lines for the individual sine waves and the sum
line1, = ax1.plot([], [], label=r'$sin(x)$', color='r', lw=2)
line2, = ax1.plot([], [], label=r'$2sin(0.5x+0.5)$', color='g', lw=2)
line3, = ax1.plot([], [], label=r'$1.5sin(2x+1)$', color='b', lw=2)
line_sum, = ax2.plot([], [], label=r'Sum', color='orange', lw=2)

# Set up the equation text for the sum
equation_text = ax1.text(0.5, 4.5, "", ha='center', fontsize=12, color='black')

# Animation update function
def update(frame):
    t = frame / fps  # Time variable (0 to duration)
    x_vals = np.linspace(0, 2 * np.pi, 1000)
    
    # Update individual sine waves in the first plot
    line1.set_data(x_vals, sine1(x_vals + t))
    line2.set_data(x_vals, sine2(x_vals + t))
    line3.set_data(x_vals, sine3(x_vals + t))
    
    # Update the sum in the second plot
    line_sum.set_data(x_vals, sine_sum(x_vals + t))

    return line1, line2, line3, line_sum, equation_text

# Show legend
ax1.legend(loc='center left', bbox_to_anchor=(1.03, 0.5), borderaxespad=0., frameon=False)
ax2.legend().set_visible(False)

# Remove white space
plt.tight_layout()

# Animation object
ani = FuncAnimation(fig, update, frames=frames, interval=1000 / fps, blit=True)

# Display the plot before saving the animation
# plt.show()

# Save the animation as a GIF
ani.save(output_path, writer=PillowWriter(fps=fps))
# plt.close(fig)  # Close the plot after saving the GIF
