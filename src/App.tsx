import React, { useState, useEffect } from 'react';
import {
  AppShell,
  NavTab,
  HeaderNotification,
} from './shell';
import {
  INITIAL_DECKS,
  INITIAL_CUSTOMERS,
  PresentationDeck,
  CustomerAccount,
  DeckSlide,
  INITIAL_SLIDES_ADAMAS,
} from './data/mockData';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { CreatePitchScreen } from './components/CreatePitchScreen';
import { GenerationModal } from './components/GenerationModal';
import { AllDecksScreen } from './components/AllDecksScreen';
import { PresentationReviewScreen } from './components/PresentationReviewScreen';
import { LogOut, CheckCircle2, ArrowRight, X } from 'lucide-react';

type AppView = 'dashboard' | 'create-pitch' | 'all-decks' | 'review';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [navTab, setNavTab] = useState<NavTab>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Deck Collections State
  const [decks, setDecks] = useState<PresentationDeck[]>(INITIAL_DECKS);
  const [customers, setCustomers] = useState<CustomerAccount[]>(INITIAL_CUSTOMERS);

  // Global Notifications (Matches 3 unread notifications in 2_.png)
  const [notifications, setNotifications] = useState<HeaderNotification[]>([
    {
      id: 'notif-1',
      title: 'Commercial Cargo Vessels',
      message: 'Presentation is ready for review.',
      timestamp: '18 Sep, 14:32',
      isRead: false,
      deckId: 'deck-commercial-cargo',
    },
    {
      id: 'notif-2',
      title: 'Oil Field Contractors',
      message: 'Presentation is ready for review.',
      timestamp: '10 Sep, 09:15',
      isRead: false,
      deckId: 'deck-oilfield-contractors',
    },
    {
      id: 'notif-3',
      title: 'Port Operations',
      message: 'Presentation is ready for review.',
      timestamp: '28 Aug, 16:40',
      isRead: false,
      deckId: 'deck-port-operations',
    },
  ]);

  // Toast Notification for Real-Time Completion Alert
  const [toastAlert, setToastAlert] = useState<{
    deckId: string;
    customer: string;
    message: string;
  } | null>(null);

  // Active Deck in Review
  const [activeDeckId, setActiveDeckId] = useState<string>('deck-adamas-wind');

  // Generation Modal State
  const [generationModalDeckId, setGenerationModalDeckId] = useState<string | null>(null);
  const [isInitialCreationFlow, setIsInitialCreationFlow] = useState<boolean>(false);

  // Background Simulation: Gradually finishes Preparing deck to Ready with controlled cadence
  useEffect(() => {
    const timer = setInterval(() => {
      let completedCustomer = '';
      let completedDeckId = '';
      let hasJustCompleted = false;

      setDecks((prevDecks) => {
        return prevDecks.map((deck) => {
          if (deck.status === 'Preparing') {
            const nextProgress = Math.min(100, deck.progressPercent + 10);
            if (nextProgress >= 100) {
              hasJustCompleted = true;
              completedCustomer = deck.customer;
              completedDeckId = deck.id;

              return {
                ...deck,
                status: 'Ready' as const,
                progressPercent: 100,
                progressText: 'Ready for review',
              };
            }

            return {
              ...deck,
              progressPercent: nextProgress,
              progressText:
                nextProgress > 75
                  ? 'Building pitch storyline...'
                  : nextProgress > 45
                  ? 'Matching relevant solutions...'
                  : 'Researching company and industry...',
            };
          }
          return deck;
        });
      });

      // Trigger notification and toast outside of state updater
      if (hasJustCompleted && completedDeckId) {
        const notifId = `notif-${completedDeckId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        setNotifications((prevNotifs) => {
          // Avoid duplicate notification if already added for this deck
          if (prevNotifs.some((n) => n.id === notifId)) return prevNotifs;
          return [
            {
              id: notifId,
              deckId: completedDeckId,
              title: completedCustomer,
              message: `${completedCustomer} presentation is ready for review.`,
              timestamp: 'Just now',
              isRead: false,
            },
            ...prevNotifs,
          ];
        });

        setToastAlert({
          deckId: completedDeckId,
          customer: completedCustomer,
          message: `${completedCustomer} presentation is ready for review!`,
        });

        // Auto-hide toast after 6 seconds
        setTimeout(() => setToastAlert(null), 6000);
      }
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  // FAST-FORWARD SIMULATION HANDLER
  const handleFastForward = () => {
    let completedCustomer = '';
    let completedDeckId = '';

    setDecks((prevDecks) => {
      const preparing = prevDecks.find((d) => d.status === 'Preparing');
      if (!preparing) return prevDecks;

      completedCustomer = preparing.customer;
      completedDeckId = preparing.id;

      return prevDecks.map((d) =>
        d.id === preparing.id
          ? {
              ...d,
              status: 'Ready' as const,
              progressPercent: 100,
              progressText: 'Ready for review',
            }
          : d
      );
    });

    if (completedDeckId) {
      const notifId = `notif-${completedDeckId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      setNotifications((prevNotifs) => [
        {
          id: notifId,
          deckId: completedDeckId,
          title: completedCustomer,
          message: `${completedCustomer} presentation is ready for review.`,
          timestamp: 'Just now',
          isRead: false,
        },
        ...prevNotifs,
      ]);

      setToastAlert({
        deckId: completedDeckId,
        customer: completedCustomer,
        message: `${completedCustomer} presentation is ready for review!`,
      });

      setTimeout(() => setToastAlert(null), 6000);
    }
  };

  // SPAWN ANOTHER PREPARING DECK FOR SIMULATION
  const handleSimulateNewPreparing = () => {
    const id = `deck-sim-${Date.now()}`;
    const newDeck: PresentationDeck = {
      id,
      title: 'Nordic Offshore: Next-Gen Crew Competence',
      customer: 'Nordic Offshore Energy',
      industry: 'Offshore Wind',
      createdDate: 'Just now',
      status: 'Preparing',
      progressPercent: 15,
      progressText: 'Customer context received...',
      slidesCount: 8,
      thumbnail: '/src/assets/images/offshore_rig_sunset_1790488961713.jpg',
      audience: 'Head of Operations',
      pitchBrief: 'Simulated high-voltage offshore technician competence readiness deck.',
      slides: INITIAL_SLIDES_ADAMAS,
    };

    setDecks((prev) => [newDeck, ...prev]);
  };

  // RESET SIMULATION STATE
  const handleResetSimulation = () => {
    setDecks(INITIAL_DECKS);
    setToastAlert(null);
  };

  // Navigation handlers
  const handleSelectNavTab = (tab: NavTab) => {
    setNavTab(tab);
    if (tab === 'dashboard') {
      setCurrentView('dashboard');
    } else if (tab === 'all-decks') {
      setCurrentView('all-decks');
    }
  };

  const handleOpenDeck = (deckId: string) => {
    setActiveDeckId(deckId);
    setCurrentView('review');
    setIsSidebarCollapsed(true);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setNavTab('dashboard');
    setIsSidebarCollapsed(false);
  };

  const handleCloseGenerationModal = React.useCallback(() => {
    setGenerationModalDeckId(null);
    setCurrentView('dashboard');
    setNavTab('dashboard');
    setIsSidebarCollapsed(false);
  }, []);

  // Submit New Pitch Creation Flow
  const handleSubmitNewPitch = (data: {
    customer: CustomerAccount;
    audience?: string;
    pitchBrief: string;
  }) => {
    const newDeckId = `deck-${Date.now()}`;
    const newDeckTitle = `${data.customer.name}: Customized Competence Pitch`;

    const newDeck: PresentationDeck = {
      id: newDeckId,
      title: newDeckTitle,
      customer: data.customer.name,
      industry: data.customer.industry,
      createdDate: 'Just now',
      status: 'Preparing',
      progressPercent: 20,
      progressText: 'Customer context received...',
      slidesCount: 8,
      thumbnail: '/src/assets/images/wind_turbine_technician_1790488933366.jpg',
      audience: data.audience,
      pitchBrief: data.pitchBrief,
      slides: INITIAL_SLIDES_ADAMAS.map((s, idx) => ({
        ...s,
        title: idx === 0 ? data.customer.name : s.title,
        notes: idx === 0 ? `Prepared for ${data.customer.name}` : s.notes,
      })),
    };

    setDecks((prev) => [newDeck, ...prev]);
    setGenerationModalDeckId(newDeckId);
    setIsInitialCreationFlow(true);
  };

  // Blank Presentation creation
  const handleStartBlankPitch = () => {
    const blankDeckId = `deck-blank-${Date.now()}`;
    const blankDeck: PresentationDeck = {
      id: blankDeckId,
      title: 'Commercial Cargo Vessels: Safety & Competence',
      customer: 'Commercial Client',
      industry: 'Maritime',
      createdDate: 'Just now',
      status: 'Ready',
      progressPercent: 100,
      progressText: 'Ready for review',
      slidesCount: 8,
      thumbnail: '/src/assets/images/cargo_vessel_port_1790488945291.jpg',
      slides: INITIAL_SLIDES_ADAMAS,
    };

    setDecks((prev) => [blankDeck, ...prev]);
    setActiveDeckId(blankDeckId);
    setCurrentView('review');
    setIsSidebarCollapsed(true);
  };

  // Slide updating
  const handleUpdateDeckSlides = (updatedSlides: DeckSlide[]) => {
    setDecks((prev) =>
      prev.map((d) => (d.id === activeDeckId ? { ...d, slides: updatedSlides } : d))
    );
  };

  const activeDeck = decks.find((d) => d.id === activeDeckId) || decks[0];
  const modalDeck = decks.find((d) => d.id === generationModalDeckId) || decks[0];

  // If user signed out, show Login Screen
  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLogin={() => {
          setIsAuthenticated(true);
          setCurrentView('dashboard');
        }}
        onPreviewShell={() => {
          setIsAuthenticated(true);
          setCurrentView('dashboard');
        }}
      />
    );
  }

  return (
    <AppShell
      currentTab={navTab}
      onSelectTab={handleSelectNavTab}
      isSidebarCollapsed={isSidebarCollapsed}
      onToggleSidebarCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      notifications={notifications}
      onMarkAllAsRead={() =>
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
      }
      onLogout={() => setIsAuthenticated(false)}
      onOpenNotification={(notif) => {
        setNotifications((prev) =>
          prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
        );
        if (notif.deckId) {
          handleOpenDeck(notif.deckId);
        }
      }}
      hideHeader={currentView === 'review'}
    >
      {/* View Content */}
      <div className="h-full relative">
        {currentView === 'dashboard' && (
          <DashboardScreen
            decks={decks}
            onStartCreatePitch={() => setCurrentView('create-pitch')}
            onStartBlankPitch={handleStartBlankPitch}
            onOpenDeck={handleOpenDeck}
            onViewProgress={(deckId) => {
              setGenerationModalDeckId(deckId);
              setIsInitialCreationFlow(false);
            }}
            onViewAllDecks={() => {
              setCurrentView('all-decks');
              setNavTab('all-decks');
            }}
            onFastForward={handleFastForward}
            onSimulateNewPreparing={handleSimulateNewPreparing}
            onResetSimulation={handleResetSimulation}
          />
        )}

        {currentView === 'create-pitch' && (
          <CreatePitchScreen
            customers={customers}
            onAddNewCustomer={(newCust) => setCustomers((prev) => [newCust, ...prev])}
            onSubmitPitch={handleSubmitNewPitch}
            onCancel={handleBackToDashboard}
          />
        )}

        {currentView === 'all-decks' && (
          <AllDecksScreen
            decks={decks}
            onOpenDeck={handleOpenDeck}
            onViewProgress={(deckId) => {
              setGenerationModalDeckId(deckId);
              setIsInitialCreationFlow(false);
            }}
            onBackToDashboard={handleBackToDashboard}
          />
        )}

        {currentView === 'review' && (
          <PresentationReviewScreen
            deck={activeDeck}
            onBackToDashboard={handleBackToDashboard}
            onUpdateDeckSlides={handleUpdateDeckSlides}
          />
        )}
      </div>

      {/* Non-Blocking Progress Modal (View Progress Popup) */}
      {generationModalDeckId && (
        <GenerationModal
          deck={modalDeck}
          isOpen={!!generationModalDeckId}
          isInitialCreationFlow={isInitialCreationFlow}
          onClose={handleCloseGenerationModal}
          onRedirectToDashboard={handleCloseGenerationModal}
          onOpenDeck={(deckId) => {
            setGenerationModalDeckId(null);
            handleOpenDeck(deckId);
          }}
        />
      )}

      {/* REAL-TIME TOAST NOTIFICATION ON COMPLETION */}
      {toastAlert && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#003E61] text-white p-4 rounded-xl shadow-2xl border border-[#1686BD] flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200 max-w-md">
          <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold font-maersk-headline text-white truncate">
              {toastAlert.customer} Presentation Ready
            </p>
            <p className="text-[11px] text-[#E2F3FB] mt-0.5 leading-snug">
              {toastAlert.message}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                const id = toastAlert.deckId;
                setToastAlert(null);
                handleOpenDeck(id);
              }}
              className="text-xs font-bold text-white bg-[#1686BD] hover:bg-[#42B0D5] hover:text-[#003E61] px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Open</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setToastAlert(null)}
              className="text-[#A1D1E8] hover:text-white p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </AppShell>
  );
}
