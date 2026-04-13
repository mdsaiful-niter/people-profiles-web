import { useEffect, useState } from 'react';

interface Person {
  timestamp: string;
  name: string;
  image: string | null;
  id: string;
  section: string;
  department: string;
}

export default function Home() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/people_data.json');
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        const data = await response.json();
        setPeople(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground text-lg">Loading profiles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      {/* Header */}
      <div className="container mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          People Profiles
        </h1>
        <p className="text-lg text-muted-foreground">
          Displaying {people.length} profiles from the recruitment list
        </p>
      </div>

      {/* Grid of Profiles */}
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {people.map((person, index) => (
            <div key={index} className="profile-card">
              {/* Profile Image */}
              {person.image ? (
                <img
                  src={person.image}
                  alt={person.name}
                  className="profile-image"
                  loading="lazy"
                />
              ) : (
                <div className="profile-image bg-secondary flex items-center justify-center">
                  <span className="text-muted-foreground">No Image</span>
                </div>
              )}

              {/* Profile Information */}
              <div className="profile-info">
                <h2 className="profile-name">{person.name}</h2>

                <div className="space-y-2">
                  <div className="profile-detail">
                    <span className="profile-detail-label">ID:</span>
                    <span>{person.id}</span>
                  </div>

                  <div className="profile-detail">
                    <span className="profile-detail-label">Section:</span>
                    <span>{person.section}</span>
                  </div>

                  <div className="profile-detail">
                    <span className="profile-detail-label">Department:</span>
                    <span>{person.department}</span>
                  </div>

                  <div className="profile-detail">
                    <span className="profile-detail-label">Timestamp:</span>
                    <span className="text-xs">{person.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="container mt-16 pt-8 border-t border-border">
        <p className="text-center text-muted-foreground mb-4">
          Total Profiles: <span className="font-semibold text-foreground">{people.length}</span>
        </p>
        <p className="text-center text-sm text-muted-foreground">
          Web app created by <span className="font-semibold text-foreground">Saiful Islam</span> from <span className="font-semibold text-foreground">IPE'13</span>
        </p>
      </div>
    </div>
  );
}
