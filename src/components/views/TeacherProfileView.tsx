import CollapsibleCard from '@/components/common/CollapsibleCard';
import { formatDate } from '@/lib/dateFormatters';

import type { Teacher } from '@/types/teacher/teacher.types';

export default function TeacherProfileView({ teacher }: { teacher: Teacher }) {
  return (
    <div className="space-y-4">
      {/* Personal Information */}
      <CollapsibleCard title="Personal Information">
        <div className="space-y-1">
          <p>
            <strong>DOB:</strong> {formatDate(teacher.personalInfo.dateOfBirth)}
          </p>
          <p>
            <strong>Gender:</strong> {teacher.personalInfo.gender}
          </p>
          <p>
            <strong>NIC:</strong> {teacher.personalInfo.nic}
          </p>
          <p>
            <strong>Phone:</strong> {teacher.personalInfo.contact.phoneNumber}
          </p>
        </div>
      </CollapsibleCard>

      {/* Address Information */}
      <CollapsibleCard title="Address Information">
        <div className="space-y-1">
          <p>
            <strong>Street:</strong> {teacher.personalInfo.address.street}
          </p>
          <p>
            <strong>City:</strong> {teacher.personalInfo.address.city}
          </p>
          <p>
            <strong>Postal Code:</strong>{' '}
            {teacher.personalInfo.address.postalCode}
          </p>
          <p>
            <strong>Police Division:</strong>{' '}
            {teacher.personalInfo.address.policeDivision}
          </p>
        </div>
      </CollapsibleCard>

      {/* Professional Information */}
      <CollapsibleCard title="Professional Information">
        <div className="space-y-1">
          <p>
            <strong>Qualifications:</strong>{' '}
            {teacher.professionalInfo.qualifications?.join(', ') || 'N/A'}
          </p>
          <p>
            <strong>Experience:</strong>{' '}
            {teacher.professionalInfo.yearsOfExperience || 'N/A'} yrs
          </p>
          <p>
            <strong>Subjects:</strong>{' '}
            {teacher.professionalInfo.subjects.join(', ')}
          </p>
          <p>
            <strong>Bio:</strong> {teacher.professionalInfo.bio || 'N/A'}
          </p>
          <p>
            <strong>Max Students:</strong>{' '}
            {teacher.professionalInfo.maxStudents || 'N/A'}
          </p>
          <p>
            <strong>Employment:</strong>{' '}
            {teacher.professionalInfo.employmentType}
          </p>
          <p>
            <strong>Salary:</strong>{' '}
            {teacher.professionalInfo.salary?.amount
              ? `${teacher.professionalInfo.salary.currency}: ${teacher.professionalInfo.salary.amount}`
              : 'N/A'}
          </p>
          <p>
            <strong>Joined:</strong>{' '}
            {teacher.professionalInfo.joinedDate &&
              formatDate(teacher.professionalInfo.joinedDate)}
          </p>
        </div>
      </CollapsibleCard>

      {/* Bank Information */}
      <CollapsibleCard title="Bank Information">
        <div className="space-y-1">
          <p>
            <strong>Bank Name:</strong> {teacher.bankInfo?.bankName || 'N/A'}
          </p>
          <p>
            <strong>Account Number:</strong>{' '}
            {teacher.bankInfo?.accountNumber || 'N/A'}
          </p>
        </div>
      </CollapsibleCard>
    </div>
  );
}
