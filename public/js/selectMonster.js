const removeMonsterBtn = document.querySelectorAll('.remove-monster-btn');

const handleRemoveMonster = async (e) => {
	e.target.parentElement.remove();
};

removeMonsterBtn.forEach((btn) => {
	btn.addEventListener('click', handleRemoveMonster);
});
