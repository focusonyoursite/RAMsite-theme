document.addEventListener('alpine:init', () => {
    Alpine.data('contactForm', () => ({
        formData: {
            name: '',
            email: '',
            message: ''
        },
        loading: false,
        submitted: false,

        isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        async submitForm() {
            this.loading = true;

            try {
                const response = await fetch('/wp-admin/admin-ajax.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        action: 'submit_contact',
                        ...this.formData
                    })
                });

                const data = await response.json();

                if (data.success) {
                    this.submitted = true;
                    this.formData = { name: '', email: '', message: '' };
                } else {
                    throw new Error(data.message || 'Er is iets misgegaan');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Er is iets misgegaan bij het versturen van het formulier. Probeer het later opnieuw.');
            } finally {
                this.loading = false;
            }
        }
    }));
}); 