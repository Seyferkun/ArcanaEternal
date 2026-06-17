import json, requests, time, os, shutil

COMFYUI = "http://127.0.0.1:8189"
OUTPUT_DIR = r"C:\ComfyUI\output"
ASSETS_DIR = r"C:\Users\blade\ArcanaEternal\assets"

def generate_image(prompt, filename, seed=None, w=768, h=1024, steps=30, cfg=7.5):
    workflow = {
        "1": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": "Juggernaut-X-RunDiffusion-NSFW.safetensors"}},
        "2": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["1", 1], "text": prompt}},
        "3": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["1", 1], "text": "blurry, low quality, distorted, ugly, deformed, watermark, text, signature, cropped, worst quality"}},
        "4": {"class_type": "EmptyLatentImage", "inputs": {"width": w, "height": h, "batch_size": 1}},
        "5": {"class_type": "KSampler", "inputs": {"model": ["1", 0], "positive": ["2", 0], "negative": ["3", 0], "latent_image": ["4", 0], "seed": seed or 42, "steps": steps, "cfg": cfg, "sampler_name": "euler_ancestral", "scheduler": "karras", "denoise": 1.0}},
        "6": {"class_type": "VAEDecode", "inputs": {"samples": ["5", 0], "vae": ["1", 2]}},
        "7": {"class_type": "SaveImage", "inputs": {"filename_prefix": filename, "images": ["6", 0]}}
    }
    
    resp = requests.post(f"{COMFYUI}/prompt", json={"prompt": workflow}, timeout=30)
    resp.raise_for_status()
    prompt_id = resp.json().get("prompt_id")
    print(f"  [Q] {filename} -> {prompt_id[:8]}...")
    
    for i in range(120):
        time.sleep(2)
        h_resp = requests.get(f"{COMFYUI}/history/{prompt_id}", timeout=10)
        if h_resp.status_code == 200:
            hd = h_resp.json()
            if prompt_id in hd:
                for nid, out in hd[prompt_id].get("outputs", {}).items():
                    if "images" in out:
                        for img in out["images"]:
                            src = os.path.join(OUTPUT_DIR, img.get("subfolder", ""), img.get("filename", ""))
                            if os.path.exists(src):
                                print(f"  [OK] {filename}")
                                return src
                break
    print(f"  [FAIL] {filename}")
    return None

# Generate card frames
print("=" * 50)
print("GENERATING CARD FRAMES")
print("=" * 50)

frames = [
    ("fantasy card frame border, ornate golden border, empty center, Final Fantasy TCG style, dark blue background, metallic gold filigree, corner gems, no characters, no text, clean card border design, high quality, 4k", "card_frame_gold", 1001),
    ("fantasy card frame border, ornate silver border, empty center, Final Fantasy TCG style, dark purple background, metallic silver filigree, corner gems, no characters, no text, clean card border design, high quality, 4k", "card_frame_silver", 1002),
    ("fantasy card frame border, ornate bronze border, empty center, Final Fantasy TCG style, dark green background, metallic bronze filigree, corner gems, no characters, no text, clean card border design, high quality, 4k", "card_frame_bronze", 1003),
]

for prompt, fname, seed in frames:
    print(f"\nGenerating: {fname}")
    result = generate_image(prompt, fname, seed=seed, w=768, h=1024, steps=30, cfg=7.5)
    if result:
        # Copy to assets
        dst = os.path.join(ASSETS_DIR, "cards", f"{fname}.png")
        shutil.copy2(result, dst)
        print(f"  -> Copied to {dst}")

print("\nDone!")
