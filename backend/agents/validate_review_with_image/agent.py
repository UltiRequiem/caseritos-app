from nearai.agents.environment import Environment
from PIL import Image
import io
import base64

MODEL = "fireworks::accounts/fireworks/models/llama4-scout-instruct-basic"

SYSTEM_PROMPT = """You're an image description validator. Analyze the image and user's description. 
If accurate, respond with "Accurate: [brief confirmation]". 
If inaccurate, respond with "Inaccurate: [concise explanation]". 
Keep responses under 100 words. Prioritize objective visual elements."""

def load_image(bytes: bytes) -> Image.Image:
    try:
        return Image.open(io.BytesIO(bytes))
    except Exception as e:
        raise ValueError(f"Invalid image: {str(e)}")

def process_message(env: Environment, message):
    images = []
    attachments = message.get('attachments', [])
    
    for attachment in attachments:
        if not hasattr(attachment, 'file_id'):
            continue
            
        file_bytes = env.read_file_by_id(attachment.file_id, decode=None)
        if not isinstance(file_bytes, bytes):
            continue
            
        try:
            images.append(load_image(file_bytes))
        except Exception as e:
            env.add_reply(f"⚠️ Error processing image: {str(e)}")
            return None

    if not images:
        env.add_reply("🖼️ Please attach an image to validate")
        return None

    return images

def build_content(images, user_text):
    content = []
    for img in images:
        buffer = io.BytesIO()
        img.save(buffer, format=img.format)
        img_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
        content.append({
            "type": "image_url",
            "image_url": {"url": f"data:image/{img.format};base64,{img_base64}"}
        })
    
    content.append({"type": "text", "text": user_text})
    return content

def run(env: Environment):
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    
    for message in env.list_messages():
        if message['role'] != 'user':
            continue
            
        images = process_message(env, message)

        if not images:
            continue
            
        user_text = message['content'] or "Is this description accurate?"
        content = build_content(images, user_text)
        
        messages.append({
            "role": "user",
            "content": str(content)
        })
        
        try:
            response = env.completion(messages, model=MODEL)
            env.add_reply(response)
        except Exception as e:
            env.add_reply(f"🔧 Error processing request: {str(e)}")

run(env)
