import { Modal } from '@/components/interaction/Modal';

export function Blog() {
  return (
    <section>
      <div className="container py-5 md:py-10 mx-auto flex px-5 md:px-0  flex-col">
        <h2>Blog</h2>

        <Modal>
          <div>
            <h2>Olá, mundo!</h2>
            <p>Este é um exemplo de um modal.</p>
            <button>Botão dentro do modal</button>
          </div>
        </Modal>
      </div>
    </section>
  );
}
