const selectPcBtn = document.querySelectorAll('.select-pc-btn');
const stagedPc = [];

const selectPcHandler = async (e) => {
	if (e.target.parentElement.hasAttribute('data-id')) {
		const id = e.target.parentElement.getAttribute('data-id');

		e.target.classList.toggle('btn-success');

		if (e.target.classList.contains('btn-success')) {
			e.target.textContent = '✓';
			stagedPc.push(id);
		} else {
			e.target.textContent = '+';

			let index = stagedPc.indexOf(id);
			stagedPc.splice(index, 1);
		}
	}
};

selectPcBtn.forEach((btn) => {
	btn.addEventListener('click', selectPcHandler);
});
