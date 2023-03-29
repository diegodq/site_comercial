const link = document.getElementById('link');

function sendMessageContact()
{
	const formContactUs = document.getElementById('contactForm');
	formContactUs.addEventListener('submit', event => {
		event.preventDefault();

		const formData = new FormData(formContactUs);
		const dataMessage = Object.fromEntries(formData);

		fetch(formContactUs.action, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dataMessage)
		})
		.then(response => response.json())
		.then(data => {
			if(data.status == true) {
				document.getElementById('contactSuccess').classList.remove('hidden');
				formContactUs.reset();
			}
		})
		.catch(error => {
			if(error) {
				document.getElementById('contactError').classList.remove('hidden');
				formContactUs.reset();
				console.log(error);
			}
		});
	});
}