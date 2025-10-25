import re

with open('C:/Users/ohyus/MONSTA/dolpa-spa/categories_rows.sql', 'r', encoding='utf-8') as f:
    content = f.read()

# parent_id가 null인 항목 찾기
pattern = r"\('([^']+)', null, '([^']+)', '([^']+)', [^,]+, '([^']*)', '(\d+)'"
matches = re.findall(pattern, content)

print('1차 메뉴 (parent_id가 null인 카테고리):')
print('=' * 80)
for match in matches:
    id, name, slug, icon, service_count = match
    print(f'{name:30} | slug: {slug:30} | icon: {icon or "없음":15} | services: {service_count}')
