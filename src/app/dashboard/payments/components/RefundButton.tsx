'use client';
import { useState } from 'react';
import { BaseButton, BaseModal } from '_components/custom';
import { PaymentModule } from '_store/state-management';

interface RefundButtonProps {
  transactionId: string;
  status: string;
}

export const RefundButton = ({ transactionId, status }: RefundButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: refund, isPending } = PaymentModule.refundTransactionMutation();

  if (status !== 'PAID') return null;

  const handleConfirmRefund = () => {
    refund(
      { params: { id: transactionId } },
      {
        onSuccess: () => setIsModalOpen(false),
      },
    );
  };

  return (
    <>
      <BaseButton variant="destructive" onClick={() => setIsModalOpen(true)}>
        Rembourser
      </BaseButton>

      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirmer le remboursement"
      >
        <p>
          Êtes-vous sûr de vouloir rembourser cette transaction ? Cette action est irréversible.
        </p>
        <div className="flex gap-2 justify-end mt-4">
          <BaseButton variant="secondary" onClick={() => setIsModalOpen(false)}>
            Annuler
          </BaseButton>
          <BaseButton variant="destructive" onClick={handleConfirmRefund} disabled={isPending}>
            {isPending ? 'Remboursement...' : 'Confirmer'}
          </BaseButton>
        </div>
      </BaseModal>
    </>
  );
};
